<script setup>
import { useInView } from '../composables/useInView'

const { elementRef, isInView } = useInView()

const steps = [
  {
    number: '01',
    icon: '📝',
    title: 'Regístrate con tu RUC',
    description: 'Ingresa el RUC de tu empresa. Lo validamos en SUNAT automáticamente y traemos tu razón social. En minutos tienes tu cuenta activa.',
  },
  {
    number: '02',
    icon: '⚙️',
    title: 'Configura tu empresa',
    description: 'Agrega tus series de comprobantes, sucursales, usuarios y métodos de pago. Todo desde un panel claro y ordenado.',
  },
  {
    number: '03',
    icon: '🧾',
    title: 'Emite y vende desde el primer día',
    description: 'Emite boletas y facturas electrónicas válidas ante SUNAT, registra tus ventas en el POS y controla tu inventario en tiempo real.',
  },
]
</script>

<template>
  <section
    ref="elementRef"
    class="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
  >
    <div
      class="mx-auto max-w-6xl transition-all duration-700"
      :class="isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ¿Cómo empiezo?
        </h2>
        <p class="mt-3 max-w-xl text-slate-600">
          Sin instalaciones, sin equipos de IT. Solo tu RUC y tu correo.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="step in steps"
          :key="step.number"
          class="group relative flex flex-col rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-md"
        >
          <div class="mb-4 flex items-center justify-between">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
              {{ step.number }}
            </span>
            <span class="text-2xl">{{ step.icon }}</span>
          </div>
          <h3 class="text-base font-bold text-slate-900">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500">{{ step.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
