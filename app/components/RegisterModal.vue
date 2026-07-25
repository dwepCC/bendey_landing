<script setup>
import { ref, computed, watch } from 'vue'
import { apiFetch } from '../composables/useApi.js'
import { getStoredReferral, normalizeReferralCode } from '../composables/useReferral.js'
import { trackConversion } from '../config/analytics.js'

const props = defineProps({
  plan: { type: Object, default: null },
  defaultPlan: { type: Object, default: null },
  plans: { type: Array, default: () => [] },
  open: { type: Boolean, default: false },
  referralCode: { type: String, default: '' },
  referralSeller: { type: String, default: '' },
  referralValid: { type: Boolean, default: null },
})

const emit = defineEmits(['close'])

const selectedPlanId = ref(null)

const sortedPlans = computed(() =>
  [...props.plans].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.id - b.id),
)

const effectivePlan = computed(() => {
  if (selectedPlanId.value) {
    const found = props.plans.find((p) => p.id === selectedPlanId.value)
    if (found) return found
  }
  return props.plan || props.defaultPlan || null
})

function formatPlanPrice(plan) {
  if (!plan) return ''
  if (plan.is_free || plan.price === 0) return 'Gratis'
  return `S/ ${Number(plan.price).toFixed(0)}/mes`
}

function initSelectedPlan() {
  selectedPlanId.value =
    props.plan?.id ?? props.defaultPlan?.id ?? sortedPlans.value[0]?.id ?? null
}

// ── Estado RUC ──
const ruc = ref('')
const rucError = ref('')
const rucValidating = ref(false)
const rucData = ref(null) // { razon_social, direccion, ubigeo }

// ── Formulario (solo visible tras validar RUC) ──
const form = ref({
  nombreComercial: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  passwordConfirm: '',
  rubro: 'general',
})
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const fieldError = ref({})
const submitting = ref(false)
const apiError = ref('')
const success = ref(null)

watch(() => props.open, (val) => {
  if (val) resetAll()
})

function resetAll() {
  initSelectedPlan()
  ruc.value = ''
  rucError.value = ''
  rucValidating.value = false
  rucData.value = null
  form.value = { nombreComercial: '', email: '', phone: '', address: '', password: '', passwordConfirm: '', rubro: 'general' }
  showPassword.value = false
  showPasswordConfirm.value = false
  fieldError.value = {}
  apiError.value = ''
  success.value = null
}

function onRucInput() {
  // Solo dígitos
  ruc.value = ruc.value.replace(/\D/g, '').slice(0, 11)
  rucError.value = ''
  if (rucData.value) rucData.value = null
}

async function validateRUC() {
  rucError.value = ''
  if (ruc.value.length !== 11) {
    rucError.value = 'El RUC debe tener exactamente 11 dígitos'
    return
  }
  rucValidating.value = true
  try {
    const res = await apiFetch('/api/public/validate-ruc', {
      method: 'POST',
      body: JSON.stringify({ ruc: ruc.value }),
    })
    rucData.value = res
    form.value.nombreComercial = res.razon_social || ''
    form.value.address = res.direccion || ''
  } catch (e) {
    rucError.value = e.message
    rucData.value = null
  } finally {
    rucValidating.value = false
  }
}

function validateForm() {
  const errs = {}
  if (!form.value.nombreComercial.trim()) errs.nombreComercial = 'El nombre de la empresa es requerido'
  if (!form.value.email.trim() || !form.value.email.includes('@')) errs.email = 'Correo electrónico inválido'
  if (form.value.password.length < 6) errs.password = 'La contraseña debe tener al menos 6 caracteres'
  if (form.value.password !== form.value.passwordConfirm) errs.passwordConfirm = 'Las contraseñas no coinciden'
  fieldError.value = errs
  return Object.keys(errs).length === 0
}

const effectiveReferralCode = computed(() =>
  normalizeReferralCode(props.referralCode) || getStoredReferral(),
)

async function submit() {
  if (!rucData.value) return
  if (!validateForm()) return
  submitting.value = true
  apiError.value = ''
  try {
    const refCode =
      props.referralValid === true ? effectiveReferralCode.value : ''
    const res = await apiFetch('/api/public/register', {
      method: 'POST',
      body: JSON.stringify({
        name: form.value.nombreComercial.trim(),
        ruc: ruc.value,
        email: form.value.email.trim(),
        phone: form.value.phone.trim(),
        address: form.value.address.trim(),
        ubigeo: rucData.value.ubigeo || '',
        rubro: form.value.rubro,
        password: form.value.password,
        plan_id: effectivePlan.value?.id || 0,
        referral_code: refCode,
      }),
    })
    success.value = res
    // Conversión real: es lo que Meta usa para optimizar la entrega de anuncios
    // hacia gente que se registra, no solo que hace clic. Sin datos personales:
    // solo el plan y su precio.
    trackConversion('CompleteRegistration', {
      content_name: effectivePlan.value?.name || 'Registro',
      currency: 'PEN',
      value: Number(effectivePlan.value?.price) || 0,
    })
    const dest = res.tenant_url || `https://${res.slug}.bendey.cloud`
    setTimeout(() => { window.location.href = dest }, 4000)
  } catch (e) {
    apiError.value = e.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
      @click.self="emit('close')"
    >
      <div class="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">

        <!-- Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <div class="min-w-0">
            <h2 class="text-lg font-bold text-slate-900">Registra tu empresa</h2>
            <p v-if="effectivePlan" class="text-sm text-violet-700">
              Plan: <strong>{{ effectivePlan.name }}</strong>
              <span class="text-violet-500"> · {{ formatPlanPrice(effectivePlan) }}</span>
            </p>
            <p v-else class="text-sm text-amber-600">No hay planes disponibles. Contacta a soporte.</p>
          </div>
          <button
            class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            @click="emit('close')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          v-if="referralValid === true && referralSeller"
          class="mx-6 mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          Te invita <strong>{{ referralSeller }}</strong>
          <span v-if="effectiveReferralCode" class="block text-xs text-emerald-600 mt-0.5 font-mono">
            Referido: {{ effectiveReferralCode }}
          </span>
        </div>

        <div
          v-else-if="referralValid === false"
          class="mx-6 mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          El enlace de referido no es válido o expiró. Puedes registrarte igual; si tienes un código correcto, pide a tu asesor un nuevo enlace.
        </div>

        <!-- ── Éxito ── -->
        <div v-if="success" class="px-6 py-8 text-center">
          <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="mb-1 text-xl font-bold text-slate-900">¡Tu empresa está lista!</h3>
          <p class="mb-1 text-sm text-slate-500">{{ success.name }} fue registrada correctamente</p>
          <p v-if="success.plan" class="mb-6 text-sm text-violet-600">
            Plan activo: <strong>{{ success.plan }}</strong>
          </p>
          <div v-else class="mb-6" />

          <!-- Tarjeta de acceso — siempre visible -->
          <div class="mb-5 rounded-2xl border-2 border-violet-200 bg-violet-50 p-5">
            <p class="mb-0.5 text-xs font-semibold uppercase tracking-widest text-violet-400">Tu panel de gestión</p>
            <p class="mb-3 break-all font-mono text-sm font-bold text-violet-800">
              {{ success.tenant_url || `https://${success.slug}.bendey.cloud` }}
            </p>
            <a
              :href="success.tenant_url || `https://${success.slug}.bendey.cloud`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-violet-600 px-6 py-3.5 text-base font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 active:scale-95"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ir a mi negocio
            </a>
            <p class="mt-2 text-xs text-violet-400">Redirigiendo automáticamente en unos segundos…</p>
          </div>

          <!-- Correo de acceso -->
          <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm">
            <span class="text-slate-400">Ingresa con tu correo:</span>
            <p class="font-medium text-slate-800">{{ success.email }}</p>
          </div>
        </div>

        <!-- ── Formulario ── -->
        <form v-else class="px-6 py-5 space-y-5" @submit.prevent="submit">

          <!-- Error API -->
          <div v-if="apiError" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {{ apiError }}
          </div>

          <!-- Selector de plan -->
          <div v-if="sortedPlans.length">
            <label class="mb-2 block text-sm font-semibold text-slate-700">Elige tu plan</label>
            <div class="grid gap-2 sm:grid-cols-2">
              <button
                v-for="p in sortedPlans"
                :key="p.id"
                type="button"
                class="flex items-start justify-between gap-2 rounded-xl border-2 px-3.5 py-3 text-left transition"
                :class="selectedPlanId === p.id
                  ? 'border-violet-500 bg-violet-50 ring-2 ring-violet-100'
                  : 'border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50'"
                @click="selectedPlanId = p.id"
              >
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-slate-900">{{ p.name }}</p>
                  <p v-if="p.description" class="mt-0.5 line-clamp-2 text-xs text-slate-500">{{ p.description }}</p>
                </div>
                <div class="shrink-0 text-right">
                  <p class="text-sm font-bold" :class="selectedPlanId === p.id ? 'text-violet-700' : 'text-slate-700'">
                    {{ formatPlanPrice(p) }}
                  </p>
                  <p v-if="p.is_default_signup && !plan" class="mt-0.5 text-[10px] text-emerald-600">Incluido</p>
                </div>
              </button>
            </div>
            <p v-if="effectivePlan && effectivePlan.price > 0 && !(effectivePlan.is_free)" class="mt-2 text-xs text-slate-400">
              Los planes de pago se activan tras confirmar el registro. Podrás gestionar tu suscripción desde el panel.
            </p>
          </div>

          <!-- ── PASO 1: RUC + Validar ── -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              RUC de la empresa *
            </label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <input
                  v-model="ruc"
                  type="text"
                  inputmode="numeric"
                  maxlength="11"
                  placeholder="20123456789"
                  class="w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 pr-8"
                  :class="rucError ? 'border-red-400 bg-red-50' : rucData ? 'border-green-400 bg-green-50' : 'border-slate-300'"
                  :disabled="rucValidating"
                  @input="onRucInput"
                  @keyup.enter.prevent="validateRUC"
                >
                <!-- Check verde si validado -->
                <svg
                  v-if="rucData"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <button
                type="button"
                :disabled="ruc.length !== 11 || rucValidating"
                class="shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50"
                :class="rucData
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-violet-600 text-white hover:bg-violet-700'"
                @click="validateRUC"
              >
                <span v-if="rucValidating" class="flex items-center gap-1.5">
                  <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Verificando
                </span>
                <span v-else-if="rucData">✓ Validado</span>
                <span v-else>Validar</span>
              </button>
            </div>
            <p v-if="rucError" class="mt-1.5 text-xs text-red-500">{{ rucError }}</p>
            <p v-else class="mt-1 text-xs text-slate-400">Solo empresas con RUC activo en SUNAT pueden registrarse</p>
          </div>

          <!-- ── Campos del formulario (visibles tras validar RUC) ── -->
          <div v-if="rucData">
            <!-- Razón social confirmada (solo lectura, visual) -->
            <div class="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5">
              <p class="text-sm font-semibold text-slate-800">{{ rucData.razon_social }}</p>
            </div>

            <!-- Nombre comercial (editable, pre-llenado con razón social) -->
            <div class="mb-4">
              <label class="mb-1.5 block text-sm font-medium text-slate-700">
                Nombre de tu negocio *
                <span class="ml-1 text-xs font-normal text-slate-400">puedes usar un nombre diferente</span>
              </label>
              <input
                v-model="form.nombreComercial"
                type="text"
                placeholder="Nombre que aparecerá en el sistema"
                class="w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                :class="fieldError.nombreComercial ? 'border-red-400' : 'border-slate-300'"
              >
              <p v-if="fieldError.nombreComercial" class="mt-1 text-xs text-red-500">{{ fieldError.nombreComercial }}</p>
            </div>

            <!-- Dirección (editable, pre-llenada desde SUNAT) -->
            <div class="mb-4">
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Dirección fiscal</label>
              <input
                v-model="form.address"
                type="text"
                placeholder="Dirección de tu empresa"
                class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              >
            </div>

            <!-- Email -->
            <div class="mb-4">
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Correo electrónico *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="contacto@miempresa.com"
                class="w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                :class="fieldError.email ? 'border-red-400' : 'border-slate-300'"
              >
              <p v-if="fieldError.email" class="mt-1 text-xs text-red-500">{{ fieldError.email }}</p>
            </div>

            <!-- Teléfono -->
            <div class="mb-4">
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Teléfono</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="999 000 000"
                class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              >
            </div>

            <!-- Contraseña -->
            <div class="mb-4">
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Contraseña *</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Mínimo 6 caracteres"
                  class="w-full rounded-lg border px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  :class="fieldError.password ? 'border-red-400' : 'border-slate-300'"
                >
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="fieldError.password" class="mt-1 text-xs text-red-500">{{ fieldError.password }}</p>
            </div>

            <!-- Confirmar contraseña -->
            <div class="mb-4">
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Confirmar contraseña *</label>
              <div class="relative">
                <input
                  v-model="form.passwordConfirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  placeholder="Repite tu contraseña"
                  class="w-full rounded-lg border px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  :class="fieldError.passwordConfirm ? 'border-red-400' : 'border-slate-300'"
                >
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                >
                  <svg v-if="showPasswordConfirm" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="fieldError.passwordConfirm" class="mt-1 text-xs text-red-500">{{ fieldError.passwordConfirm }}</p>
            </div>

            <!-- Rubro -->
            <div class="mb-5">
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Tipo de negocio</label>
              <select
                v-model="form.rubro"
                class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              >
                <option value="general">General (comercio, servicios, etc.)</option>
                <option value="gastronomico">Gastronómico (restaurante, cafetería, etc.)</option>
              </select>
            </div>

            <button
              type="submit"
              :disabled="submitting || !effectivePlan"
              class="w-full rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
              <span v-if="submitting" class="flex items-center justify-center gap-2">
                <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Creando tu empresa...
              </span>
              <span v-else>Registrar empresa y acceder →</span>
            </button>
          </div>

          <!-- Placeholder mientras no se valida el RUC -->
          <div v-else class="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 text-sm">
            Ingresa tu RUC y presiona <strong>Validar</strong> para continuar
          </div>

        </form>
      </div>
    </div>
  </Teleport>
</template>
