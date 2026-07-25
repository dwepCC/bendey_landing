<script setup>
import { brand, homeNavigation } from '~/config/brand.js'
import { solutionRoutes } from '~/config/seoRoutes.js'

const { openRegister } = useRegister()

useSeoMeta({
  title: 'Planes y Precios | Bendey Cloud',
  description:
    'Conoce los planes de Bendey Cloud: facturación electrónica SUNAT, POS, inventario y más. Prueba gratis 1 mes y elige el plan que se ajusta a tu negocio.',
})
</script>

<template>
  <div class="relative overflow-hidden">
    <Navbar :brand="brand" :navigation="homeNavigation" @register="openRegister" />

    <main class="pt-20">
      <section class="mx-auto max-w-5xl px-6 pt-14 text-center sm:pt-20">
        <h1 class="text-3xl font-extrabold tracking-tight text-bendey-navy sm:text-[2.75rem]">
          Planes y Precios
        </h1>
        <p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
          Empieza con una prueba gratis de 1 mes. Activa solo las herramientas que necesitas y
          escala cuando tu negocio crezca.
        </p>
      </section>

      <!-- Tabla de planes: se carga del backend (precios siempre actualizados). -->
      <Pricing @select-plan="openRegister" />

      <!-- Enlazado interno -->
      <section class="mx-auto max-w-5xl px-6 py-12">
        <h2 class="text-2xl font-bold tracking-tight text-bendey-navy">Explora las soluciones</h2>
        <div class="mt-5 flex flex-wrap gap-3">
          <NuxtLink
            v-for="r in solutionRoutes.filter((s) => s.to !== '/precios')"
            :key="r.to"
            :to="r.to"
            class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-bendey-navy transition hover:border-slate-300 hover:shadow-sm"
          >
            {{ r.label }}
          </NuxtLink>
        </div>
      </section>
    </main>

    <Footer :brand="brand" />
  </div>
</template>
