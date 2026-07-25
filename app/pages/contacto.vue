<script setup>
import { brand, homeNavigation } from '~/config/brand.js'
import { PHONE_DISPLAY, WHATSAPP_URL, TEL_URL } from '~/config/contact.js'
import { solutionRoutes } from '~/config/seoRoutes.js'

const { openRegister } = useRegister()

useSeoMeta({
  title: 'Contacto | Bendey Cloud',
  description:
    'Contáctanos por WhatsApp o teléfono para resolver tus dudas sobre Bendey Cloud, agendar una demostración o recibir soporte con la configuración.',
})
</script>

<template>
  <div class="relative overflow-hidden">
    <Navbar :brand="brand" :navigation="homeNavigation" @register="openRegister" />

    <main class="pt-20">
      <section class="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <h1 class="text-3xl font-extrabold tracking-tight text-bendey-navy sm:text-[2.75rem]">
          Contacto
        </h1>
        <p class="mt-4 text-lg leading-relaxed text-slate-600">
          ¿Tienes dudas o quieres una demostración? Escríbenos por WhatsApp o llámanos; también
          puedes empezar tu prueba gratis ahora mismo.
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            :href="WHATSAPP_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(15,39,68,0.06)] ring-1 ring-slate-100 transition hover:shadow-md"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#128C4B]">
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 00-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 11-4.13 15.06l-.3-.18-3.08.89.9-3-.2-.31A8.1 8.1 0 0112.04 3.8z"/></svg>
            </span>
            <span>
              <span class="block text-sm font-semibold text-bendey-navy">WhatsApp</span>
              <span class="block text-sm text-slate-500">{{ PHONE_DISPLAY }}</span>
            </span>
          </a>

          <a
            :href="TEL_URL"
            class="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(15,39,68,0.06)] ring-1 ring-slate-100 transition hover:shadow-md"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-bendey-gold/15 text-bendey-navy">
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            </span>
            <span>
              <span class="block text-sm font-semibold text-bendey-navy">Teléfono</span>
              <span class="block text-sm text-slate-500">{{ PHONE_DISPLAY }}</span>
            </span>
          </a>
        </div>

        <button
          type="button"
          class="mt-6 inline-flex items-center justify-center rounded-xl bg-bendey-navy px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-bendey-navy-mid"
          @click="openRegister()"
        >
          Empieza tu prueba gratis
        </button>

        <div class="mt-12">
          <h2 class="text-xl font-bold tracking-tight text-bendey-navy">Explora las soluciones</h2>
          <div class="mt-4 flex flex-wrap gap-3">
            <NuxtLink
              v-for="r in solutionRoutes.filter((s) => s.to !== '/contacto')"
              :key="r.to"
              :to="r.to"
              class="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-bendey-navy transition hover:border-slate-300 hover:shadow-sm"
            >
              {{ r.label }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <Footer :brand="brand" />
  </div>
</template>
