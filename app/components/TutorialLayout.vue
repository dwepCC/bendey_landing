<script setup>
// Plantilla de tutorial/guía paso a paso. Data-driven: recibe secciones con pasos
// reales y las renderiza con TOC lateral pegajoso + contenido numerado. Mantiene el
// lenguaje visual de la landing (navy/gold). El TOC hace scroll suave SIN # en la URL.
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { brand, homeNavigation } from '~/config/brand.js'
import { WHATSAPP_URL } from '~/config/contact.js'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  h1: { type: String, required: true },
  lead: { type: String, required: true },
  // Nombre de la app para los CTA ("Probar Bendey ERP").
  appName: { type: String, default: 'Bendey' },
  // [{ id, title, intro?, steps: [{ title, detail }], tips?: [string] }]
  sections: { type: Array, required: true },
})

const { openRegister } = useRegister()
const activeId = ref(props.sections[0]?.id || '')

function scrollToId(id, attempts = 12) {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 90 // margen bajo el navbar fijo
    window.scrollTo({ top: y, behavior: 'smooth' })
  } else if (attempts > 0) {
    requestAnimationFrame(() => scrollToId(id, attempts - 1))
  }
}

// Resalta en el TOC la sección visible.
let observer = null
onMounted(async () => {
  await nextTick()
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) activeId.value = e.target.id
      }
    },
    { rootMargin: '-90px 0px -70% 0px', threshold: 0 },
  )
  props.sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="relative overflow-hidden">
    <Navbar :brand="brand" :navigation="homeNavigation" @register="openRegister" />

    <main class="pt-20">
      <!-- Cabecera -->
      <section class="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <p v-if="eyebrow" class="mb-3 inline-flex rounded-full bg-bendey-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-bendey-navy">
          {{ eyebrow }}
        </p>
        <h1 class="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-bendey-navy sm:text-[2.5rem] sm:leading-[1.1]">
          {{ h1 }}
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{{ lead }}</p>
        <div class="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-bendey-navy px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bendey-navy-mid"
            @click="openRegister()"
          >
            Probar {{ appName }} gratis
          </button>
          <a
            :href="WHATSAPP_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-bendey-navy transition hover:border-slate-300 hover:shadow-sm"
          >
            Pedir ayuda a un asesor
          </a>
        </div>
      </section>

      <!-- Contenido: TOC pegajoso + pasos -->
      <section class="mx-auto max-w-6xl px-6 pb-16">
        <div class="lg:grid lg:grid-cols-[240px,1fr] lg:gap-12">
          <!-- Índice -->
          <aside class="mb-8 lg:mb-0">
            <nav class="lg:sticky lg:top-24">
              <p class="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Contenido</p>
              <ol class="space-y-1.5">
                <li v-for="(s, i) in sections" :key="s.id">
                  <button
                    type="button"
                    class="flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition"
                    :class="activeId === s.id ? 'bg-bendey-gold/15 font-semibold text-bendey-navy' : 'text-slate-500 hover:bg-slate-50 hover:text-bendey-navy'"
                    @click="scrollToId(s.id)"
                  >
                    <span class="mt-0.5 text-xs font-bold text-bendey-gold">{{ i + 1 }}.</span>
                    {{ s.title }}
                  </button>
                </li>
              </ol>
            </nav>
          </aside>

          <!-- Secciones con pasos -->
          <div class="min-w-0 space-y-14">
            <article v-for="(s, i) in sections" :id="s.id" :key="s.id" class="scroll-mt-24">
              <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-bendey-navy text-sm font-bold text-white">
                  {{ i + 1 }}
                </span>
                <h2 class="text-2xl font-bold tracking-tight text-bendey-navy">{{ s.title }}</h2>
              </div>
              <p v-if="s.intro" class="mt-3 leading-relaxed text-slate-600">{{ s.intro }}</p>

              <ol v-if="s.steps?.length" class="mt-5 space-y-4">
                <li v-for="(step, si) in s.steps" :key="si" class="relative rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(15,39,68,0.06)] ring-1 ring-slate-100">
                  <div class="flex items-start gap-3">
                    <span class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bendey-gold/20 text-xs font-bold text-bendey-navy">
                      {{ si + 1 }}
                    </span>
                    <div class="min-w-0">
                      <p class="font-semibold text-bendey-navy">{{ step.title }}</p>
                      <p v-if="step.detail" class="mt-1 text-[15px] leading-relaxed text-slate-600">{{ step.detail }}</p>
                    </div>
                  </div>
                </li>
              </ol>

              <div v-if="s.tips?.length" class="mt-4 rounded-xl border-l-4 border-bendey-gold bg-amber-50/60 px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-wide text-bendey-navy">Consejos</p>
                <ul class="mt-1.5 space-y-1 text-sm text-slate-600">
                  <li v-for="(t, ti) in s.tips" :key="ti" class="flex items-start gap-2">
                    <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-bendey-gold" />
                    {{ t }}
                  </li>
                </ul>
              </div>
            </article>

            <!-- CTA final -->
            <div class="rounded-2xl bg-bendey-navy px-8 py-10 text-center">
              <h2 class="text-2xl font-extrabold text-white">¿List{{ 'o' }} para empezar?</h2>
              <p class="mx-auto mt-3 max-w-xl text-white/70">
                Crea tu cuenta y prueba {{ appName }} con los datos de tu negocio. Prueba gratis de 1 mes.
              </p>
              <button
                type="button"
                class="mt-6 inline-flex items-center justify-center rounded-xl bg-bendey-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-bendey-navy transition hover:bg-bendey-gold-dark"
                @click="openRegister()"
              >
                Comenzar ahora
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer :brand="brand" />
  </div>
</template>
