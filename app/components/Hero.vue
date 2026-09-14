<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { WHATSAPP_URL } from '../config/contact.js'

defineProps({
  brand: { type: Object, required: true },
})
const emit = defineEmits(['register'])

const highlights = [
  { label: 'Facturación electrónica', icon: 'invoice' },
  { label: 'Inventario en tiempo real', icon: 'boxes' },
  { label: 'Reportes y estadísticas', icon: 'chart' },
  { label: 'PC, web y celular', icon: 'device' },
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
          <!-- Sello de confianza: la homologación SUNAT ahora es visible (antes solo
               estaba en los meta tags). -->
          <div class="flex flex-wrap items-center gap-2">
            <div
              class="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Homologado SUNAT
            </div>
            <div
              class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-bendey-navy"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-500" />
              Sistema de gestión para tu negocio
            </div>
          </div>

          <div class="space-y-4">
            <!-- H1 con keyword (intención de búsqueda). La frase de marca pasa a subtítulo. -->
            <h1 class="text-3xl font-extrabold leading-tight tracking-tight text-bendey-navy sm:text-[2.5rem] sm:leading-[1.1]">
              Facturación Electrónica <span class="text-bendey-gold">SUNAT</span> y POS para tu negocio en Perú
            </h1>
            <p class="text-xl font-extrabold text-bendey-navy sm:text-2xl">
              Con Bendey vende más. <span class="text-bendey-gold">Controla todo.</span>
            </p>
            <p class="max-w-md text-[15px] leading-relaxed text-slate-500 sm:text-base">
              {{ brand.tagline }}. Escala con Bendey Resto, caja, reportes y apps nativas para
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
                <AppIcon :name="item.icon" class="h-5 w-5" />
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
            <RouterLink
              to="/precios"
              class="inline-flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-bendey-navy/15 bg-white px-5 py-3.5 transition hover:border-bendey-navy/30 hover:shadow-sm sm:max-w-[220px]"
            >
              <span class="text-sm font-bold uppercase tracking-wide text-bendey-navy">Ver planes</span>
              <span class="text-[11px] text-bendey-navy/60">Precios y comparación</span>
            </RouterLink>
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
