<script setup>
// Plantilla de las páginas de producto orientadas a búsqueda (SEO). Reutiliza el
// lenguaje visual de la landing (navy/gold, tarjetas redondeadas) y SOLO recibe
// copy real ya existente en el sistema; no inventa funciones. Cada página pasa su
// H1, intro, bloques y bullets, más el enlazado interno a las páginas hermanas.
import { brand, homeNavigation } from '~/config/brand.js'
import { WHATSAPP_URL } from '~/config/contact.js'

defineProps({
  eyebrow: { type: String, default: '' },
  h1: { type: String, required: true },
  lead: { type: String, required: true },
  // Bloques de detalle: [{ title, description }] — copy real de Modules/Features.
  blocks: { type: Array, default: () => [] },
  // Lista de características concretas (checklist), real.
  bullets: { type: Array, default: () => [] },
  // Enlazado interno a otras páginas: [{ to, label }].
  related: { type: Array, default: () => [] },
})

const { openRegister } = useRegister()
</script>

<template>
  <div class="relative overflow-hidden">
    <Navbar :brand="brand" :navigation="homeNavigation" @register="openRegister" />

    <main class="pt-20">
      <!-- Cabecera: eyebrow + H1 único + intro -->
      <section class="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <p v-if="eyebrow" class="mb-3 inline-flex rounded-full bg-bendey-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-bendey-navy">
          {{ eyebrow }}
        </p>
        <h1 class="text-3xl font-extrabold leading-tight tracking-tight text-bendey-navy sm:text-[2.75rem] sm:leading-[1.1]">
          {{ h1 }}
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{{ lead }}</p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-bendey-navy px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bendey-navy-mid"
            @click="openRegister()"
          >
            Empieza gratis
          </button>
          <a
            :href="WHATSAPP_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-bendey-navy transition hover:border-slate-300 hover:shadow-sm"
          >
            Habla con un asesor
          </a>
        </div>
      </section>

      <!-- Bloques de detalle (copy real) -->
      <section v-if="blocks.length" class="mx-auto max-w-5xl px-6 pb-6">
        <div class="grid gap-5 sm:grid-cols-2">
          <div
            v-for="b in blocks"
            :key="b.title"
            class="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(15,39,68,0.06)] ring-1 ring-slate-100"
          >
            <h2 class="text-lg font-bold text-bendey-navy">{{ b.title }}</h2>
            <p class="mt-2 text-[15px] leading-relaxed text-slate-600">{{ b.description }}</p>
          </div>
        </div>
      </section>

      <!-- Checklist de características concretas -->
      <section v-if="bullets.length" class="mx-auto max-w-5xl px-6 py-10">
        <h2 class="text-2xl font-bold tracking-tight text-bendey-navy">Qué incluye</h2>
        <ul class="mt-5 grid gap-3 sm:grid-cols-2">
          <li v-for="item in bullets" :key="item" class="flex items-start gap-2.5 text-[15px] text-slate-700">
            <svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 flex-shrink-0 text-bendey-gold" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {{ item }}
          </li>
        </ul>
      </section>

      <!-- Enlazado interno a las páginas hermanas -->
      <section v-if="related.length" class="mx-auto max-w-5xl px-6 py-10">
        <h2 class="text-2xl font-bold tracking-tight text-bendey-navy">Explora también</h2>
        <div class="mt-5 flex flex-wrap gap-3">
          <NuxtLink
            v-for="r in related"
            :key="r.to"
            :to="r.to"
            class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-bendey-navy transition hover:border-slate-300 hover:shadow-sm"
          >
            {{ r.label }}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </section>

      <!-- CTA de cierre -->
      <section class="mx-auto max-w-5xl px-6 py-16">
        <div class="rounded-2xl bg-bendey-navy px-8 py-12 text-center">
          <h2 class="text-2xl font-extrabold text-white sm:text-3xl">Empieza hoy con tu prueba gratis</h2>
          <p class="mx-auto mt-3 max-w-xl text-white/70">
            1 mes completo para probar Bendey con los datos de tu negocio. Sin instalar nada por la web.
          </p>
          <button
            type="button"
            class="mt-6 inline-flex items-center justify-center rounded-xl bg-bendey-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-bendey-navy transition hover:bg-bendey-gold-dark"
            @click="openRegister()"
          >
            Regístrate gratis
          </button>
        </div>
      </section>
    </main>

    <Footer :brand="brand" />
  </div>
</template>
