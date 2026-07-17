<script setup>
import { RouterLink } from 'vue-router'
import { useApplications } from '../composables/useApplications.js'
import { appVisual, downloadChannelLabels } from '../composables/applicationDownloads.js'

defineEmits(['register'])

const { visibleApplications, loading, resolvePublicUrl } = useApplications()

function appImage(app) {
  return app.image_url ? resolvePublicUrl(app.image_url) : ''
}
</script>

<template>
  <section
    v-if="loading || visibleApplications.length > 0"
    class="relative z-10 overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8"
  >
    <div
      class="pointer-events-none absolute right-0 top-0 h-48 w-48 bendey-dots opacity-40"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl">
      <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-bold uppercase tracking-wider text-bendey-gold">Apps Bendey</p>
          <h2 class="mt-1 text-3xl font-extrabold text-bendey-navy sm:text-4xl">
            Prueba la aplicación
            <span class="text-bendey-gold">en minutos</span>
          </h2>
          <p class="mt-3 max-w-xl text-slate-600">
            Instala en Windows o Android y conoce Bendey en tu negocio real.
          </p>
          <p class="mt-2 max-w-xl text-sm text-slate-500">
            Descarga directa o desde Microsoft Store y Google Play — instalación rápida y enlaces siempre actualizados.
          </p>
        </div>
        <RouterLink
          to="/apps"
          class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-bendey-gold px-6 py-3 text-sm font-bold text-bendey-navy shadow-md transition hover:bg-bendey-gold-dark"
        >
          Ver todas las apps
        </RouterLink>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-bendey-gray-border border-t-bendey-navy" />
      </div>

      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="app in visibleApplications.slice(0, 3)"
          :key="app.code || app.name"
          to="/apps"
          class="group flex flex-col overflow-hidden rounded-2xl border border-bendey-gray-border bg-white shadow-sm transition hover:border-bendey-gold hover:shadow-lg"
        >
          <div class="relative aspect-[16/10] bg-bendey-gray overflow-hidden">
            <img
              v-if="appImage(app)"
              :src="appImage(app)"
              :alt="app.name"
              class="h-full w-full object-cover transition group-hover:scale-105"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center bg-gradient-to-br from-bendey-navy to-bendey-navy-mid text-5xl"
            >
              {{ appVisual(app.code).emoji }}
            </div>
            <span
              class="absolute left-3 top-3 rounded-full bg-bendey-gold px-2.5 py-0.5 text-xs font-bold text-bendey-navy"
            >
              {{ appVisual(app.code).tag }}
            </span>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <h3 class="font-bold text-bendey-navy group-hover:text-bendey-navy-mid">{{ app.name }}</h3>
            <p v-if="app.description" class="mt-2 line-clamp-2 whitespace-pre-line text-sm text-slate-600">
              {{ app.description }}
            </p>
            <div v-if="downloadChannelLabels(app).length" class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="label in downloadChannelLabels(app)"
                :key="label"
                class="rounded-full bg-bendey-gray px-2.5 py-0.5 text-[11px] font-semibold text-slate-600"
              >
                {{ label }}
              </span>
            </div>
            <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-bendey-gold-dark">
              Descargar ahora
              <svg viewBox="0 0 20 20" class="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02Z"
                />
              </svg>
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
