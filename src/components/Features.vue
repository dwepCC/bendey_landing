<script setup>
import { useInView } from '../composables/useInView'

const { elementRef, isInView } = useInView()

const features = [
  {
    icon: '🇵🇪',
    title: 'Integración directa con SUNAT',
    description: 'Facturación electrónica homologada. Emite comprobantes válidos, envía resúmenes diarios y gestiona bajas sin salir del sistema.',
    accent: 'SUNAT',
  },
  {
    icon: '🏢',
    title: 'Multi sucursal',
    description: 'Administra varias sedes o tiendas desde una sola cuenta. Cada sucursal tiene sus propias series, caja y usuarios asignados.',
    accent: 'Multi sede',
  },
  {
    icon: '🧩',
    title: 'Todo en un solo sistema',
    description: 'Activa solo las herramientas que necesitas. Inventario, compras, caja, restaurante y más se conectan sin duplicar datos.',
    accent: 'Integrado',
  },
  {
    icon: '🍽️',
    title: 'Especializado para restaurantes',
    description: 'Bendey resto conecta mesas, cocina y facturación en un flujo continuo. Ideal para restaurantes, cafeterías y dark kitchens.',
    accent: 'Resto',
  },
  {
    icon: '📊',
    title: 'Reportes en tiempo real',
    description: 'Ventas del día, stock actual, compras del mes, rentabilidad por producto. Información disponible en el momento que la necesitas.',
    accent: 'Reportes',
  },
  {
    icon: '🔐',
    title: 'Control de acceso por roles',
    description: 'Define exactamente qué puede ver y hacer cada usuario. Permisos granulares por módulo, acción y sucursal.',
    accent: 'Seguridad',
  },
]
</script>

<template>
  <section
    ref="elementRef"
    id="caracteristicas"
    class="bg-white px-4 py-20 sm:px-6 lg:px-8"
  >
    <div
      class="mx-auto max-w-6xl transition-all duration-700"
      :class="isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <div class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Características principales
          </h2>
          <p class="mt-3 max-w-xl text-slate-600">
            Diseñado para la realidad del negocio peruano, desde la bodega hasta la cadena de restaurantes.
          </p>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="feat in features"
          :key="feat.title"
          class="group flex flex-col rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md"
        >
          <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-2xl">
            {{ feat.icon }}
          </div>
          <h3 class="text-base font-bold text-slate-900">{{ feat.title }}</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{{ feat.description }}</p>
          <span class="mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-800">
            {{ feat.accent }}
          </span>
        </article>
      </div>
    </div>
  </section>
</template>
