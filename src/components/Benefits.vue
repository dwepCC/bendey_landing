<script setup>
import { useInView } from '../composables/useInView'

const { elementRef, isInView } = useInView()

const benefits = [
  {
    icon: '🧾',
    badge: 'SUNAT al día',
    title: 'Cumple sin complicarte',
    description: 'Emite boletas, facturas y notas electrónicas homologadas. Los resúmenes diarios y bajas se envían automáticamente. Sin multas, sin papel.',
  },
  {
    icon: '📊',
    badge: 'Visibilidad total',
    title: 'Sabe qué pasa en tu negocio',
    description: 'Dashboard con ventas del día, stock actual, compras pendientes y caja en tiempo real. Todo en una sola pantalla, sin exportar a Excel.',
  },
  {
    icon: '🏢',
    badge: 'Multi sede',
    title: 'Crece sin cambiar de sistema',
    description: 'Agrega sucursales, nuevos usuarios y activa módulos cuando los necesites. Un sistema que escala contigo sin migraciones.',
  },
  {
    icon: '🍽️',
    badge: 'Restaurantes',
    title: 'Diseñado para gastronomía',
    description: 'Bendey resto integra mesas, cocina y caja en un solo flujo. Atiende más rápido, reduce errores y factura desde la misma pantalla.',
  },
]
</script>

<template>
  <section
    ref="elementRef"
    class="bg-white px-4 py-20 sm:px-6 lg:px-8"
  >
    <div
      class="mx-auto max-w-6xl transition-all duration-700"
      :class="isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ¿Por qué Bendey Cloud?
        </h2>
        <p class="mt-3 max-w-xl text-slate-600">
          No es solo facturación electrónica. Es la plataforma completa para operar, controlar y crecer.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="group flex gap-5 rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md"
        >
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-2xl">
            {{ benefit.icon }}
          </div>
          <div>
            <span class="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
              {{ benefit.badge }}
            </span>
            <h3 class="mt-2 text-base font-bold text-slate-900">{{ benefit.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-500">{{ benefit.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
