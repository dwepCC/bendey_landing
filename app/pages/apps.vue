<script setup>
import { RouterLink } from 'vue-router'
import { useApplications } from '../composables/useApplications.js'
import { buildDownloadRows, appVisual } from '../composables/applicationDownloads.js'
import { brand, appsNavigation } from '../config/brand.js'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const { openRegister } = useRegister()

useSeo({
  title: 'Descargar apps de Bendey para Windows y Android | Bendey Cloud',
  description:
    'Descarga las aplicaciones de Bendey para Windows y Android. Bendey Resto y más, listas para instalar y usar en tu negocio.',
})

const { visibleApplications, loading, error, resolvePublicUrl, formatFileSize } = useApplications()

function rowsFor(app) {
  return buildDownloadRows(app, resolvePublicUrl, formatFileSize)
}

function appImage(app) {
  return app.image_url ? resolvePublicUrl(app.image_url) : ''
}
</script>

<template>
  <div class="relative min-h-screen bg-white text-bendey-navy">
    <div class="relative overflow-hidden bg-white">
      <!-- Mismo lenguaje visual que el Hero del home: fondo claro, patrón de puntos,
           badges e insignias en pill, en vez del bloque navy a pantalla completa que
           hacía que esta página se sintiera de otro sitio. -->
      <div
        class="pointer-events-none absolute right-0 top-0 z-0 h-72 w-full max-w-xl bendey-dots opacity-50 sm:h-80"
        aria-hidden="true"
      />

      <Navbar :brand="brand" :navigation="appsNavigation" @register="openRegister" />

      <!-- Hero deliberadamente compacto: esta página existe para que se descargue la
           app, no para venderla de nuevo — el listado debe aparecer casi sin scroll,
           en vez de empujarlo hacia abajo con un hero a pantalla completa. -->
      <section class="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <span
            class="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-bendey-navy"
          >
            <span class="h-2 w-2 rounded-full bg-emerald-500" />
            Disponible para Windows y Android
          </span>

          <h1 class="text-2xl font-extrabold leading-tight tracking-tight text-bendey-navy sm:text-3xl">
            Lleva Bendey a tu <span class="text-bendey-gold">PC o celular</span>
          </h1>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-[15px]">
            Descarga nuestras apps nativas y conecta con tu cuenta en la nube. Sin complicaciones,
            instalación en minutos.
          </p>

          <div class="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-500 sm:text-sm">
            <span v-for="item in ['Gratis para empezar', 'Enlaces siempre actualizados', 'Tiendas oficiales + descarga directa']" :key="item" class="inline-flex items-center gap-1.5">
              <svg class="h-3.5 w-3.5 shrink-0 text-bendey-navy" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ item }}
            </span>
          </div>
        </div>
      </section>
    </div>

    <!-- Listado de apps -->
    <section id="apps-disponibles" class="relative bg-slate-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
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
            @click="openRegister"
          >
            Crear cuenta gratis mientras tanto
          </button>
        </div>

        <!-- 2 columnas lado a lado en desktop: antes cada app ocupaba el ancho
             completo y había que bajar mucho para llegar a la segunda. -->
        <div v-else class="grid gap-6 lg:grid-cols-2 lg:items-start">
          <article
            v-for="(app, index) in visibleApplications"
            :key="app.code || app.name"
            class="@container overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-bendey-gray-border"
          >
            <div class="relative bg-bendey-navy px-6 py-7 sm:px-8">
              <div class="flex items-start gap-4">
                <div
                  v-if="appImage(app)"
                  class="h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-bendey-gold/50"
                >
                  <img :src="appImage(app)" :alt="app.name" class="h-full w-full object-cover" />
                </div>
                <div
                  v-else
                  class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-bendey-navy-mid text-3xl ring-2 ring-white/20"
                >
                  {{ appVisual(app.code).emoji }}
                </div>
                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs font-bold uppercase tracking-wider text-white/80">
                      {{ appVisual(app.code).tag }}
                    </span>
                    <span
                      v-if="index === 0"
                      class="rounded-full bg-bendey-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-bendey-gold"
                    >
                      Recomendado
                    </span>
                  </div>
                  <h2 class="mt-0.5 text-xl font-extrabold text-white sm:text-2xl">{{ app.name }}</h2>
                </div>
              </div>

              <p v-if="app.description" class="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/90">
                {{ app.description }}
              </p>

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

            <!-- Plataformas: por contenedor (no por viewport), así se mantienen 2
                 columnas lado a lado apenas la tarjeta tiene ancho suficiente, sin
                 depender de cuántas columnas tenga la grilla de la página. -->
            <div class="grid grid-cols-1 divide-y divide-slate-100 @sm:grid-cols-2 @sm:divide-x @sm:divide-y-0">
              <div
                v-for="row in rowsFor(app)"
                :key="row.key"
                class="flex flex-col p-5 sm:p-6"
              >
                <div class="mb-3 flex items-center gap-3">
                  <span
                    class="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
                    :class="`bg-gradient-to-br ${row.meta.accent} text-white shadow-md`"
                  >
                    {{ row.meta.icon }}
                  </span>
                  <div class="min-w-0">
                    <h3 class="font-bold text-slate-900">{{ row.meta.label }}</h3>
                    <p class="truncate text-xs text-slate-500">{{ row.meta.hint }}</p>
                  </div>
                  <span
                    v-if="row.direct?.version"
                    class="ml-auto shrink-0 rounded-full bg-bendey-gold/20 px-2.5 py-0.5 text-xs font-semibold text-bendey-gold"
                  >
                    v{{ row.direct.version }}
                  </span>
                </div>

                <div class="mt-auto space-y-2.5">
                  <a
                    v-if="row.direct"
                    :href="row.direct.href"
                    class="flex w-full items-center justify-center gap-2 rounded-xl bg-bendey-navy px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-bendey-navy-mid"
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
                    class="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-bendey-gray-border bg-white px-4 py-2.5 text-sm font-semibold text-bendey-navy transition hover:border-bendey-gold"
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
            @click="openRegister"
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

    <!-- Guías de uso de cada app -->
    <section class="mx-auto max-w-5xl px-6 pb-16">
      <h2 class="text-center text-2xl font-bold tracking-tight text-bendey-navy">¿Ya la instalaste? Aprende a usarla</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <RouterLink
          to="/tutorial-bendey-erp"
          class="group rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(15,39,68,0.06)] ring-1 ring-slate-100 transition hover:shadow-md"
        >
          <p class="text-xs font-bold uppercase tracking-wide text-bendey-gold">Guía de uso</p>
          <p class="mt-1 text-lg font-bold text-bendey-navy">Cómo usar Bendey ERP</p>
          <p class="mt-1 text-sm text-slate-500">Configura tu empresa, vende, emite comprobantes SUNAT, controla inventario y más.</p>
          <span class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-bendey-navy group-hover:text-bendey-gold">Ver tutorial →</span>
        </RouterLink>
        <RouterLink
          to="/tutorial-bendey-resto"
          class="group rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(15,39,68,0.06)] ring-1 ring-slate-100 transition hover:shadow-md"
        >
          <p class="text-xs font-bold uppercase tracking-wide text-bendey-gold">Guía de uso</p>
          <p class="mt-1 text-lg font-bold text-bendey-navy">Cómo usar Bendey Resto</p>
          <p class="mt-1 text-sm text-slate-500">Configura tu carta, atiende mesas, envía comandas a cocina, cobra y factura.</p>
          <span class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-bendey-navy group-hover:text-bendey-gold">Ver tutorial →</span>
        </RouterLink>
      </div>
    </section>

    <Footer :brand="brand" />
  </div>
</template>
