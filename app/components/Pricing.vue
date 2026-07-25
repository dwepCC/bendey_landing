<script setup>
import { ref, computed } from 'vue'
import { usePlans } from '../composables/usePlans.js'
import { WHATSAPP_URL as whatsappUrl } from '../config/contact.js'

const emit = defineEmits(['select-plan'])

const { plans, loading, error } = usePlans()

// ——— Toggle mensual / anual ———
const billingMode = ref('monthly') // 'monthly' | 'annual'

function displayPrice(plan) {
  if (billingMode.value === 'annual') {
    if (plan.annual_price > 0) return plan.annual_price
    if (plan.annual_discount_percent > 0) {
      return plan.price * 12 * (1 - plan.annual_discount_percent / 100)
    }
  }
  return plan.price
}

function savingsLabel(plan) {
  if (billingMode.value !== 'annual') return null
  if (plan.annual_discount_percent > 0) {
    return `Ahorra ${plan.annual_discount_percent}%`
  }
  if (plan.annual_price > 0 && plan.price > 0) {
    const yearly = plan.price * 12
    const saved = yearly - plan.annual_price
    if (saved > 0) {
      const pct = Math.round((saved / yearly) * 100)
      return `Ahorra ${pct}%`
    }
  }
  return null
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(price)
}

// ——— Carrusel ———
const current = ref(0)
const trackRef = ref(null)

const sortedPlans = computed(() => [...plans.value].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.id - b.id))

const totalSlides = computed(() => sortedPlans.value.length)

function prev() {
  current.value = (current.value - 1 + totalSlides.value) % totalSlides.value
}
function next() {
  current.value = (current.value + 1) % totalSlides.value
}
function goTo(i) {
  current.value = i
}

// Touch/swipe
let touchStartX = 0
function onTouchStart(e) { touchStartX = e.touches[0].clientX }
function onTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
}

// En desktop mostramos 3 a la vez, el carrusel desplaza 1 a la vez
function cardStyle(index) {
  // En mobile muestra 1 a la vez; en md 3 simultáneas con transform
  return {}
}

function isFeatured(plan) {
  return plan.featured === true
}
</script>

<template>
  <section id="precios" class="bg-gradient-to-b from-slate-50 to-white px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">

      <!-- Encabezado -->
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Planes y precios
        </h2>
        <p class="mt-3 text-lg text-slate-500">
          Sin contratos rígidos. Cancela cuando quieras.
        </p>
      </div>

      <!-- Toggle mensual / anual -->
      <div class="mb-10 flex justify-center">
        <div class="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            class="rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200"
            :class="billingMode === 'monthly'
              ? 'bg-violet-600 text-white shadow'
              : 'text-slate-500 hover:text-slate-800'"
            @click="billingMode = 'monthly'"
          >
            Mensual
          </button>
          <button
            type="button"
            class="relative rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200"
            :class="billingMode === 'annual'
              ? 'bg-violet-600 text-white shadow'
              : 'text-slate-500 hover:text-slate-800'"
            @click="billingMode = 'annual'"
          >
            Anual
            <span class="absolute -top-2.5 -right-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
              -20%
            </span>
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-lg bg-red-50 p-6 text-center text-red-700">
        No pudimos cargar los planes. Contáctanos por WhatsApp.
      </div>

      <!-- Carrusel de planes -->
      <div v-else-if="sortedPlans.length" class="relative">

        <!-- Desktop: 3 columnas simultáneas con deslizamiento -->
        <div class="hidden md:block">
          <div class="overflow-hidden px-1 py-2">
            <div
              class="flex items-stretch transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(calc(-${current} * (100% / 3)))` }"
            >
              <div
                v-for="plan in sortedPlans"
                :key="plan.id"
                class="w-1/3 shrink-0 px-3"
              >
                <div
                  class="flex h-full flex-col rounded-2xl border bg-white p-7 shadow-sm transition-all duration-300"
                  :class="isFeatured(plan)
                    ? 'border-violet-400 ring-2 ring-violet-400 shadow-violet-100 shadow-lg'
                    : 'border-slate-200 hover:border-violet-200 hover:shadow-md'"
                >
                  <!-- Badge destacado (dentro del flujo para evitar recorte por overflow) -->
                  <div v-if="isFeatured(plan)" class="mb-4 flex justify-center">
                    <span class="whitespace-nowrap rounded-full bg-violet-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                      ⭐ Más popular
                    </span>
                  </div>

                  <!-- Encabezado del plan -->
                  <div class="mb-5">
                    <h3 class="text-xl font-bold text-slate-900">{{ plan.name }}</h3>
                    <p v-if="plan.description" class="mt-1 text-sm text-slate-500">{{ plan.description }}</p>
                  </div>

                  <!-- Precio -->
                  <div class="mb-6">
                    <div class="flex items-end gap-1">
                      <span class="text-4xl font-extrabold text-slate-900">
                        {{ formatPrice(displayPrice(plan)) }}
                      </span>
                      <span class="mb-1 text-sm text-slate-400">
                        / {{ billingMode === 'annual' ? 'año' : 'mes' }}
                      </span>
                    </div>
                    <!-- Ahorro -->
                    <div v-if="savingsLabel(plan)" class="mt-1">
                      <span class="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        {{ savingsLabel(plan) }}
                      </span>
                    </div>
                    <!-- Precio equivalente mensual cuando está en modo anual -->
                    <p v-if="billingMode === 'annual' && plan.price > 0" class="mt-1 text-xs text-slate-400">
                      Equivale a {{ formatPrice(displayPrice(plan) / 12) }} / mes
                    </p>
                  </div>

                  <!-- Características -->
                  <ul class="mb-8 flex-1 space-y-2.5">
                    <!-- Documentos electrónicos: solo si el plan los incluye -->
                    <li v-if="plan.is_unlimited_documents || plan.monthly_documents_limit > 0" class="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span v-if="plan.is_unlimited_documents">Documentos electrónicos ilimitados</span>
                      <span v-else>Hasta {{ plan.monthly_documents_limit.toLocaleString('es-PE') }} docs electrónicos / mes</span>
                    </li>
                    <!-- Sucursales -->
                    <li v-if="plan.max_branches > 0 || plan.max_branches === 0" class="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span v-if="plan.max_branches === 0">Sucursales ilimitadas</span>
                      <span v-else>Hasta {{ plan.max_branches }} sucursal{{ plan.max_branches === 1 ? '' : 'es' }}</span>
                    </li>
                    <!-- Usuarios / empleados -->
                    <li v-if="plan.max_users > 0 || plan.max_users === 0" class="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span v-if="plan.max_users === 0">Usuarios ilimitados</span>
                      <span v-else>Hasta {{ plan.max_users }} usuario{{ plan.max_users === 1 ? '' : 's' }}</span>
                    </li>
                    <!-- Facturación electrónica -->
                    <li v-if="plan.includes_billing" class="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span>Facturación electrónica (boletas y facturas)</span>
                    </li>
                    <!-- Marca Bendey removible -->
                    <li v-if="plan.removes_bendey_branding" class="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span>Sin marca Bendey en tu carta y tickets</span>
                    </li>
                    <!-- Exportación de reportes -->
                    <li v-if="plan.allows_report_export" class="flex items-start gap-2.5 text-sm text-slate-700">
                      <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span>Exportación de reportes a Excel / PDF</span>
                    </li>
                    <!-- Catálogo digital: anuncio, incluido para todos, no es diferenciador de pago -->
                    <li class="flex items-start gap-2.5 text-sm text-slate-500">
                      <svg class="mt-0.5 h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span>Catálogo digital (tienda online) — próximamente, incluido</span>
                    </li>
                  </ul>

                  <button
                    class="w-full rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200"
                    :class="isFeatured(plan)
                      ? 'bg-violet-600 text-white shadow-md hover:bg-violet-700 hover:shadow-lg'
                      : 'bg-slate-100 text-slate-800 hover:bg-violet-50 hover:text-violet-700 border border-slate-200'"
                    @click="emit('select-plan', plan)"
                  >
                    Comenzar con {{ plan.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Flechas desktop (solo si hay más de 3 planes) -->
          <template v-if="sortedPlans.length > 3">
            <button
              type="button"
              class="absolute -left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition"
              @click="prev"
              aria-label="Plan anterior"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              class="absolute -right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition"
              @click="next"
              aria-label="Plan siguiente"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </template>
        </div>

        <!-- Mobile: 1 plan a la vez, swipe táctil -->
        <div
          class="md:hidden overflow-hidden py-2"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div
            class="flex items-stretch transition-transform duration-400 ease-in-out"
            :style="{ transform: `translateX(-${current * 100}%)` }"
          >
            <div
              v-for="plan in sortedPlans"
              :key="plan.id"
              class="w-full shrink-0 px-2"
            >
              <div
                class="flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm"
                :class="isFeatured(plan) ? 'border-violet-400 ring-2 ring-violet-400 shadow-violet-100 shadow-lg' : 'border-slate-200'"
              >
                <div v-if="isFeatured(plan)" class="mb-4 flex justify-center">
                  <span class="whitespace-nowrap rounded-full bg-violet-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                    ⭐ Más popular
                  </span>
                </div>

                <div class="mb-4">
                  <h3 class="text-xl font-bold text-slate-900">{{ plan.name }}</h3>
                  <p v-if="plan.description" class="mt-1 text-sm text-slate-500">{{ plan.description }}</p>
                </div>

                <div class="mb-5">
                  <div class="flex items-end gap-1">
                    <span class="text-4xl font-extrabold text-slate-900">{{ formatPrice(displayPrice(plan)) }}</span>
                    <span class="mb-1 text-sm text-slate-400">/ {{ billingMode === 'annual' ? 'año' : 'mes' }}</span>
                  </div>
                  <span v-if="savingsLabel(plan)" class="mt-1 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    {{ savingsLabel(plan) }}
                  </span>
                </div>

                <ul class="mb-6 flex-1 space-y-2.5">
                  <li v-if="plan.is_unlimited_documents || plan.monthly_documents_limit > 0" class="flex items-start gap-2 text-sm text-slate-700">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span v-if="plan.is_unlimited_documents">Documentos electrónicos ilimitados</span>
                    <span v-else>Hasta {{ plan.monthly_documents_limit.toLocaleString('es-PE') }} docs electrónicos / mes</span>
                  </li>
                  <li v-if="plan.max_branches === 0 || plan.max_branches > 0" class="flex items-start gap-2 text-sm text-slate-700">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span v-if="plan.max_branches === 0">Sucursales ilimitadas</span>
                    <span v-else>Hasta {{ plan.max_branches }} sucursal{{ plan.max_branches === 1 ? '' : 'es' }}</span>
                  </li>
                  <li v-if="plan.max_users === 0 || plan.max_users > 0" class="flex items-start gap-2 text-sm text-slate-700">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span v-if="plan.max_users === 0">Usuarios ilimitados</span>
                    <span v-else>Hasta {{ plan.max_users }} usuario{{ plan.max_users === 1 ? '' : 's' }}</span>
                  </li>
                  <li v-if="plan.includes_billing" class="flex items-start gap-2 text-sm text-slate-700">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>Facturación electrónica (boletas y facturas)</span>
                  </li>
                  <li v-if="plan.removes_bendey_branding" class="flex items-start gap-2 text-sm text-slate-700">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>Sin marca Bendey en tu carta y tickets</span>
                  </li>
                  <li v-if="plan.allows_report_export" class="flex items-start gap-2 text-sm text-slate-700">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>Exportación de reportes a Excel / PDF</span>
                  </li>
                  <li class="flex items-start gap-2 text-sm text-slate-500">
                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>Catálogo digital (tienda online) — próximamente, incluido</span>
                  </li>
                </ul>

                <button
                  class="w-full rounded-xl px-6 py-3 text-sm font-bold transition"
                  :class="isFeatured(plan)
                    ? 'bg-violet-600 text-white hover:bg-violet-700'
                    : 'bg-slate-100 text-slate-800 hover:bg-violet-50 hover:text-violet-700 border border-slate-200'"
                  @click="emit('select-plan', plan)"
                >
                  Comenzar con {{ plan.name }}
                </button>
              </div>
            </div>
          </div>

          <!-- Flechas mobile -->
          <div class="mt-4 flex items-center justify-center gap-4">
            <button type="button" @click="prev" class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm text-slate-600 hover:bg-violet-50">
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            <span class="text-sm text-slate-400">{{ current + 1 }} / {{ totalSlides }}</span>
            <button type="button" @click="next" class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm text-slate-600 hover:bg-violet-50">
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Dots indicadores (desktop y mobile) -->
        <div v-if="sortedPlans.length > 1" class="mt-6 flex justify-center gap-2">
          <button
            v-for="(_, i) in sortedPlans"
            :key="i"
            type="button"
            @click="goTo(i)"
            class="transition-all duration-300 rounded-full"
            :class="i === current ? 'bg-violet-600 w-6 h-2' : 'bg-slate-300 hover:bg-slate-400 w-2 h-2'"
            :aria-label="`Plan ${i + 1}`"
          />
        </div>
      </div>

      <!-- Sin planes configurados -->
      <div v-else class="rounded-lg bg-amber-50 p-6 text-center text-amber-800">
        Próximamente publicaremos nuestros planes. ¡Contáctanos para más información!
      </div>

      <p class="mt-10 text-center text-sm text-slate-500">
        ¿Necesitas algo personalizado?
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-violet-700 underline-offset-2 hover:underline"
        >Habla con nuestro equipo</a>
      </p>
    </div>
  </section>
</template>
