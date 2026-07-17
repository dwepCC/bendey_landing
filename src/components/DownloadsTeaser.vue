<script setup>
import { RouterLink } from 'vue-router'
import { useApplications } from '../composables/useApplications.js'

defineEmits(['register'])

const { visibleApplications, loading } = useApplications()
</script>

<template>
  <section
    v-if="loading || visibleApplications.length > 0"
    class="relative overflow-hidden bg-bendey-navy px-4 py-14 sm:px-6 lg:px-8"
  >
    <div
      class="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-bendey-gold/15 blur-3xl"
      aria-hidden="true"
    />
    <div class="relative mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:justify-between">
      <div class="max-w-xl text-center lg:text-left">
        <p class="text-sm font-bold uppercase tracking-wider text-bendey-gold">Apps nativas Bendey</p>
        <h2 class="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
          ¿Prefieres probar en tu PC o celular?
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-slate-300">
          Microsoft Store, Google Play o descarga directa del instalador — elige cómo instalar.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <RouterLink
          to="/apps"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-bendey-gold px-8 py-3.5 text-sm font-bold text-bendey-navy shadow-lg transition hover:bg-bendey-gold-dark"
        >
          Ir a descargas
          <svg viewBox="0 0 20 20" class="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02Z"
            />
          </svg>
        </RouterLink>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl border-2 border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          @click="$emit('register')"
        >
          Crear cuenta gratis
        </button>
      </div>
    </div>
  </section>
</template>
