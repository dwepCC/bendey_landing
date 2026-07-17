<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { WHATSAPP_URL } from '../config/contact.js'

defineProps({
  brand: { type: Object, required: true },
})
const emit = defineEmits(['register'])

const highlights = [
  {
    label: 'Facturación electrónica',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    label: 'Inventario en tiempo real',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    label: 'Reportes y estadísticas',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    label: 'PC, web y celular',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  },
]

const slides = [
  {
    id: 1,
    src: '/slider/imgbendey.png',
    alt: 'Bendey Cloud — panel principal del ERP',
  },
  {
    id: 2,
    src: '/slider/dash2.PNG',
    alt: 'Bendey Cloud — dashboard de restaurante',
  },
  {
    id: 3,
    src: '/slider/dash3.PNG',
    alt: 'Bendey Cloud — ventas y facturación',
  },
]

const currentSlide = ref(0)
let autoplayInterval = null

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoplay()
}
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

function pauseAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}
function resetAutoplay() {
  pauseAutoplay()
  autoplayInterval = setInterval(nextSlide, 5500)
}

onMounted(() => resetAutoplay())
onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
})
</script>

<template>
  <section class="relative overflow-hidden bg-white">
    <!-- Patrón de puntos superior izquierdo (referencia) -->
    <div
      class="pointer-events-none absolute left-0 top-0 z-0 h-72 w-full max-w-xl bendey-dots opacity-50 sm:h-80"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:pb-16">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
        <!-- Columna contenido -->
        <div class="space-y-6 lg:max-w-[540px]">
          <div
            class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-bendey-navy"
          >
            <span class="h-2 w-2 rounded-full bg-emerald-500" />
            Sistema de gestión para tu negocio
          </div>

          <div class="space-y-4">
            <h1 class="text-4xl font-extrabold leading-tight tracking-tight sm:text-[2.75rem] sm:leading-[1.1]">
              <span class="text-bendey-navy">Con </span>
              <span class="text-bendey-gold">Bendey</span>
              <br />
              <span class="text-bendey-navy">vende más.</span>
              <br />
              <span class="text-bendey-gold">Controla todo.</span>
            </h1>
            <p class="text-lg font-bold text-bendey-navy sm:text-xl">
              POS + Inventario + Facturación Electrónica
            </p>
            <p class="max-w-md text-[15px] leading-relaxed text-slate-500 sm:text-base">
              {{ brand.tagline }}. Escala con Bendey resto, caja, reportes y apps nativas para
              Windows y Android.
            </p>
          </div>

          <!-- 4 tarjetas en fila -->
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="flex flex-col items-center gap-2 rounded-xl bg-white px-2 py-3.5 text-center shadow-[0_2px_12px_rgba(15,39,68,0.08)] ring-1 ring-slate-100"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-bendey-gold/15 text-bendey-navy"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                </svg>
              </div>
              <span class="text-[10px] font-semibold leading-tight text-bendey-navy sm:text-[11px]">
                {{ item.label }}
              </span>
            </div>
          </div>

          <!-- CTAs principales -->
          <div class="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="inline-flex flex-1 flex-col items-center justify-center rounded-xl bg-bendey-navy px-5 py-3.5 transition hover:bg-bendey-navy-mid sm:max-w-[220px]"
              @click="emit('register')"
            >
              <span class="text-sm font-bold uppercase tracking-wide text-white">Prueba gratis</span>
              <span class="text-[11px] text-white/70">1 mes completo</span>
            </button>
            <button
              type="button"
              class="inline-flex flex-1 flex-col items-center justify-center rounded-xl bg-bendey-gold px-5 py-3.5 transition hover:bg-bendey-gold-dark sm:max-w-[220px]"
              @click="emit('register')"
            >
              <span class="text-sm font-bold uppercase tracking-wide text-bendey-navy">Regístrate ya</span>
              <span class="text-[11px] text-bendey-navy/70">Empieza hoy mismo</span>
            </button>
          </div>

          <!-- Acciones secundarias -->
          <div class="flex flex-wrap items-center gap-3">
            <RouterLink
              to="/apps"
              class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-bendey-navy transition hover:border-slate-300 hover:shadow-sm"
            >
              Descargar apps
              <svg viewBox="0 0 20 20" class="h-4 w-4 text-bendey-gold" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02Z"
                />
              </svg>
            </RouterLink>
            <a
              :href="WHATSAPP_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border border-emerald-400 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <!-- Columna visual -->
        <div class="relative mx-auto w-full max-w-lg lg:max-w-none lg:mx-0">
          <!-- Blob orgánico + puntos dorados (referencia) -->
          <div class="pointer-events-none absolute -right-10 -top-12 z-0 h-[145%] w-[145%] sm:-right-14 sm:-top-14 lg:h-[155%] lg:w-[155%]" aria-hidden="true">
            <svg viewBox="0 0 520 480" class="h-full w-full" preserveAspectRatio="xMaxYMin meet">
              <path
                d="M280 10 C400 0 520 60 515 180 C510 330 420 430 270 450 C120 470 20 380 15 230 C10 80 120 20 250 15 C265 12 275 11 280 10 Z"
                fill="#fef3c7"
              />
            </svg>
            <div class="hero-gold-dots absolute inset-0 opacity-[0.4]" />
          </div>

          <div
            class="relative z-10"
            @mouseenter="pauseAutoplay"
            @mouseleave="resetAutoplay"
          >
            <div
              class="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(15,39,68,0.25)] ring-1 ring-black/[0.04]"
            >
              <Transition name="hero-slide" mode="out-in">
                <img
                  :key="currentSlide"
                  :src="slides[currentSlide].src"
                  :alt="slides[currentSlide].alt"
                  class="block h-auto w-full"
                  loading="eager"
                />
              </Transition>

              <button
                type="button"
                class="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-bendey-navy shadow-md ring-1 ring-black/5 transition hover:bg-white sm:left-3 sm:p-2.5"
                aria-label="Imagen anterior"
                @click="prevSlide"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-bendey-navy shadow-md ring-1 ring-black/5 transition hover:bg-white sm:right-3 sm:p-2.5"
                aria-label="Imagen siguiente"
                @click="nextSlide"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Dots centrados bajo el mockup -->
            <div class="mt-5 flex justify-center gap-2">
              <button
                v-for="(slide, index) in slides"
                :key="slide.id"
                type="button"
                class="h-2.5 rounded-full transition-all"
                :class="
                  index === currentSlide
                    ? 'w-8 bg-bendey-gold'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                "
                :aria-label="`Ver captura ${index + 1}`"
                @click="goToSlide(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-gold-dots {
  background-image: radial-gradient(circle, rgba(245, 184, 0, 0.5) 2px, transparent 2px);
  background-size: 20px 20px;
}

.hero-slide-enter-active,
.hero-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.hero-slide-enter-from,
.hero-slide-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
