<script setup>
import { RouterLink } from 'vue-router'
import { useApplications } from '../composables/useApplications.js'
import { buildDownloadRows, buildAppDownloadCTAs, appVisual } from '../composables/applicationDownloads.js'
import { brand, appsNavigation } from '../config/brand.js'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

defineEmits(['register'])

const { visibleApplications, loading, error, resolvePublicUrl, formatFileSize } = useApplications()

function rowsFor(app) {
  return buildDownloadRows(app, resolvePublicUrl, formatFileSize)
}

function ctasFor(app) {
  return buildAppDownloadCTAs(app, resolvePublicUrl)
}

function appImage(app) {
  return app.image_url ? resolvePublicUrl(app.image_url) : ''
}
</script>

<template>
  <div class="relative min-h-screen bg-white text-bendey-navy">
    <div class="relative isolate overflow-hidden bg-bendey-navy">
      <svg
        class="pointer-events-none absolute right-0 top-0 z-0 h-36 w-36 text-bendey-gold sm:h-48 sm:w-48 md:h-56 md:w-56"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,0 100,0 100,100" fill="currentColor" />
      </svg>

      <Navbar
        :brand="brand"
        :navigation="appsNavigation"
        dark
        @register="$emit('register')"
      />

      <section class="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <span
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-bendey-gold/30 bg-bendey-gold/10 px-4 py-1.5 text-xs font-semibold text-bendey-gold backdrop-blur"
          >
            <span class="h-2 w-2 animate-pulse rounded-full bg-bendey-gold" />
            Disponible para Windows, Android y más
          </span>
          <h1 class="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Lleva Bendey a tu
            <span class="text-bendey-gold"> PC o celular</span>
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Descarga nuestras apps nativas, pruébalas en tu negocio y conecta con tu cuenta en la nube.
            Sin complicaciones — instalación en minutos.
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span class="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10">
              ✓ Gratis para empezar
            </span>
            <span class="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10">
              ✓ Enlaces siempre actualizados
            </span>
            <span class="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10">
              ✓ Tiendas oficiales + descarga directa
            </span>
          </div>
        </div>
      </section>
    </div>

    <!-- Listado de apps -->
    <section class="relative bg-slate-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <div v-if="loading" class="flex justify-center py-24">
          <div class="h-12 w-12 animate-spin rounded-full border-4 border-bendey-gray-border border-t-bendey-gold" />
        </div>

        <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center text-red-700">
          No pudimos cargar las aplicaciones. Intenta de nuevo en unos minutos.
        </div>

        <div v-else-if="visibleApplications.length === 0" class="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <p class="text-lg font-semibold text-slate-800">Próximamente nuevas apps</p>
          <p class="mt-2 text-slate-500">Estamos preparando los instaladores. Vuelve pronto.</p>
          <button
            type="button"
            class="mt-6 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white hover:bg-amber-600"
            @click="$emit('register')"
          >
            Crear cuenta gratis mientras tanto
          </button>
        </div>

        <div v-else class="space-y-10">
          <article
            v-for="(app, index) in visibleApplications"
            :key="app.code || app.name"
            class="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-bendey-gray-border"
          >
            <div class="relative bg-bendey-navy px-6 py-8 sm:px-10 sm:py-10">
              <div class="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div class="flex items-start gap-5">
                  <div
                    v-if="appImage(app)"
                    class="h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-2 ring-bendey-gold/50 sm:h-28 sm:w-28"
                  >
                    <img :src="appImage(app)" :alt="app.name" class="h-full w-full object-cover" />
                  </div>
                  <div
                    v-else
                    class="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-bendey-navy-mid text-4xl ring-2 ring-white/20 sm:h-28 sm:w-28"
                  >
                    {{ appVisual(app.code).emoji }}
                  </div>
                  <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-white/80">
                      {{ appVisual(app.code).tag }}
                    </span>
                    <h2 class="mt-1 text-2xl font-extrabold text-white sm:text-3xl">{{ app.name }}</h2>
                    <p v-if="app.description" class="mt-2 max-w-xl whitespace-pre-line text-sm leading-relaxed text-white/90 sm:text-base">
                      {{ app.description }}
                    </p>
                    <div v-if="ctasFor(app).length" class="mt-5 flex flex-wrap gap-3">
                      <a
                        v-for="cta in ctasFor(app)"
                        :key="cta.key"
                        :href="cta.href"
                        :download="cta.download || undefined"
                        :target="cta.external ? '_blank' : undefined"
                        :rel="cta.external ? 'noopener noreferrer' : undefined"
                        class="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-md transition"
                        :class="
                          cta.variant === 'direct'
                            ? 'bg-bendey-gold text-bendey-navy hover:bg-bendey-gold-dark'
                            : 'border border-white/30 bg-white/10 text-white hover:bg-white/20'
                        "
                      >
                        {{ cta.label }}
                      </a>
                    </div>
                    <ul class="mt-4 flex flex-wrap gap-2">
                      <li
                        v-for="perk in appVisual(app.code).perks"
                        :key="perk"
                        class="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                      >
                        {{ perk }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="index === 0"
                  class="shrink-0 rounded-2xl bg-white/10 px-5 py-4 text-center backdrop-blur ring-1 ring-white/20"
                >
                  <p class="text-xs font-semibold uppercase tracking-wide text-white/70">Recomendado</p>
                  <p class="mt-1 text-lg font-bold text-white">Prueba hoy</p>
                </div>
              </div>
            </div>

            <!-- Plataformas -->
            <div class="grid gap-0 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
              <div
                v-for="row in rowsFor(app)"
                :key="row.key"
                class="flex flex-col p-6 sm:p-8"
              >
                <div class="mb-4 flex items-center gap-3">
                  <span
                    class="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                    :class="`bg-gradient-to-br ${row.meta.accent} text-white shadow-md`"
                  >
                    {{ row.meta.icon }}
                  </span>
                  <div>
                    <h3 class="font-bold text-slate-900">{{ row.meta.label }}</h3>
                    <p class="text-xs text-slate-500">{{ row.meta.hint }}</p>
                  </div>
                  <span
                    v-if="row.direct?.version"
                    class="ml-auto rounded-full bg-bendey-gold/20 px-2.5 py-0.5 text-xs font-semibold text-bendey-gold"
                  >
                    v{{ row.direct.version }}
                  </span>
                </div>

                <div class="mt-auto space-y-3">
                  <a
                    v-if="row.direct"
                    :href="row.direct.href"
                    class="flex w-full items-center justify-center gap-2 rounded-xl bg-bendey-navy px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-bendey-navy-mid"
                    :download="row.key === 'windows' || row.key === 'android'"
                  >
                    <svg viewBox="0 0 20 20" class="h-5 w-5" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 1 0-1.09-1.03l-2.955 3.129V2.75Z"
                      />
                      <path
                        fill="currentColor"
                        d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"
                      />
                    </svg>
                    {{ row.meta.directLabel }}
                  </a>

                  <a
                    v-if="row.store"
                    :href="row.store.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-bendey-gray-border bg-white px-5 py-3 text-sm font-semibold text-bendey-navy transition hover:border-bendey-gold"
                  >
                    {{ row.store.label }}
                  </a>

                  <p v-if="row.direct?.fileName" class="text-center text-xs text-slate-400">
                    {{ row.direct.fileName }}
                    <span v-if="row.direct.size"> · {{ row.direct.size }}</span>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="relative overflow-hidden bg-bendey-navy px-4 py-16 sm:px-6 lg:px-8">
      <div class="relative mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">¿Listo para probar en tu negocio?</h2>
        <p class="mt-4 text-lg text-slate-300">
          Crea tu cuenta gratis, instala la app y empieza a gestionar mesas, ventas y facturación hoy mismo.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            class="rounded-xl bg-bendey-gold px-8 py-3.5 text-sm font-bold text-bendey-navy shadow-lg hover:bg-bendey-gold-dark"
            @click="$emit('register')"
          >
            Comenzar gratis
          </button>
          <RouterLink
            to="/"
            class="rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
          >
            Conocer Bendey Cloud
          </RouterLink>
        </div>
      </div>
    </section>

    <Footer :brand="brand" />
  </div>
</template>
