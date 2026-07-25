<script setup>
import { onMounted } from 'vue'
import { usePlans } from '~/composables/usePlans.js'
import {
  parseReferralFromUrl,
  getStoredReferral,
  getStoredReferralSeller,
  storeReferral,
  validateReferral,
  cleanReferralUrl,
  clearStoredReferral,
} from '~/composables/useReferral.js'

const { plans, defaultSignupPlan } = usePlans()
const { open, plan, openRegister, closeRegister } = useRegister()

// Referido: mismo comportamiento que la App.vue de la SPA, pero aquí es seguro
// para SSR porque onMounted solo corre en el cliente (window/localStorage existen).
const referralCode = ref('')
const referralSeller = ref('')
const referralValid = ref(null)

onMounted(async () => {
  const fromUrl = parseReferralFromUrl()
  const stored = getStoredReferral()
  const code = fromUrl || stored

  if (fromUrl) cleanReferralUrl()
  if (!code) return

  referralCode.value = code
  if (!fromUrl && getStoredReferralSeller()) {
    referralSeller.value = getStoredReferralSeller()
    referralValid.value = true
  }

  const result = await validateReferral(code)
  if (result.valid) {
    referralCode.value = result.code
    referralSeller.value = result.sellerName
    referralValid.value = true
    storeReferral(result.code, result.sellerName)
    if (fromUrl) openRegister()
  } else {
    referralValid.value = false
    if (fromUrl) {
      clearStoredReferral()
      referralCode.value = ''
      openRegister()
    } else if (stored) {
      clearStoredReferral()
      referralCode.value = ''
    }
  }
})
</script>

<template>
  <div class="relative min-h-screen text-slate-800">
    <slot />

    <!-- Widgets globales sin valor SEO: se renderizan solo en cliente para no
         ejecutar código de navegador durante el prerender. Un solo chat (WhatsApp);
         el chat IA se reubica/decide en la fase de correcciones. -->
    <ClientOnly>
      <WhatsAppButton />
      <AssistantChat @register="openRegister" />
      <RegisterModal
        :open="open"
        :plan="plan"
        :default-plan="defaultSignupPlan"
        :plans="plans"
        :referral-code="referralCode"
        :referral-seller="referralSeller"
        :referral-valid="referralValid"
        @close="closeRegister"
      />
    </ClientOnly>
  </div>
</template>
