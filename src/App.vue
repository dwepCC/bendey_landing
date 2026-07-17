<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { usePlans } from './composables/usePlans.js'
import {
  parseReferralFromUrl,
  getStoredReferral,
  getStoredReferralSeller,
  storeReferral,
  validateReferral,
  cleanReferralUrl,
  clearStoredReferral,
} from './composables/useReferral.js'
import WhatsAppButton from './components/WhatsAppButton.vue'
import AssistantChat from './components/AssistantChat.vue'
import RegisterModal from './components/RegisterModal.vue'

const { plans, defaultSignupPlan } = usePlans()

const registerOpen = ref(false)
const selectedPlan = ref(null)
const referralCode = ref('')
const referralSeller = ref('')
const referralValid = ref(null)

onMounted(async () => {
  const fromUrl = parseReferralFromUrl()
  const stored = getStoredReferral()
  const code = fromUrl || stored

  if (fromUrl) {
    cleanReferralUrl()
  }

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
    if (fromUrl) registerOpen.value = true
  } else {
    referralValid.value = false
    if (fromUrl) {
      clearStoredReferral()
      referralCode.value = ''
      registerOpen.value = true
    } else if (stored) {
      clearStoredReferral()
      referralCode.value = ''
    }
  }
})

function openRegister(plan = null) {
  selectedPlan.value = plan
  registerOpen.value = true
}
</script>

<template>
  <RouterView @register="openRegister" />
  <WhatsAppButton />
  <AssistantChat @register="openRegister" />
  <RegisterModal
    :open="registerOpen"
    :plan="selectedPlan"
    :default-plan="defaultSignupPlan"
    :plans="plans"
    :referral-code="referralCode"
    :referral-seller="referralSeller"
    :referral-valid="referralValid"
    @close="registerOpen = false"
  />
</template>
