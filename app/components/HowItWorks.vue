<script setup>
const steps = [
  {
    number: '01',
    icon: 'clipboard',
    title: 'Regístrate con tu RUC',
    description: 'Ingresa el RUC de tu empresa. Lo validamos en SUNAT automáticamente y traemos tu razón social. En minutos tienes tu cuenta activa.',
  },
  {
    number: '02',
    icon: 'sliders',
    title: 'Configura tu empresa',
    description: 'Agrega tus series de comprobantes, sucursales, usuarios y métodos de pago. Todo desde un panel claro y ordenado.',
  },
  {
    number: '03',
    icon: 'receiptCheck',
    title: 'Emite y vende desde el primer día',
    description: 'Emite boletas y facturas electrónicas válidas ante SUNAT, registra tus ventas en el POS y controla tu inventario en tiempo real.',
  },
]
</script>

<template>
  <section class="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ¿Cómo empiezo?
        </h2>
        <p class="mt-3 max-w-xl text-slate-600">
          Sin instalaciones, sin equipos de IT. Solo tu RUC y tu correo.
        </p>
      </div>

      <!-- Esto sí es una secuencia real, así que se representa como una: números
           conectados por una línea, no como tarjetas sueltas idénticas a las de
           Características o Módulos (que no son pasos, son datos en paralelo). -->
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:gap-0">
        <template v-for="(step, index) in steps" :key="step.number">
          <div class="flex flex-1 flex-col gap-4 md:pr-8">
            <div class="flex items-center gap-3">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bendey-navy text-sm font-bold text-white">
                {{ step.number }}
              </span>
              <AppIcon :name="step.icon" class="h-5 w-5 text-bendey-gold-dark" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-500">{{ step.description }}</p>
            </div>
          </div>
          <div v-if="index < steps.length - 1" class="hidden w-10 shrink-0 items-center justify-center md:flex md:pt-5">
            <span class="h-px w-full bg-slate-300" aria-hidden="true" />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
