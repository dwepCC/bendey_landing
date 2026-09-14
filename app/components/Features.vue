<script setup>
const features = [
  {
    icon: 'invoice',
    title: 'Integración directa con SUNAT',
    description: 'Facturación electrónica homologada. Emite comprobantes válidos, envía resúmenes diarios y gestiona bajas sin salir del sistema.',
    accent: 'SUNAT',
  },
  {
    icon: 'branches',
    title: 'Multi sucursal',
    description: 'Administra varias sedes o tiendas desde una sola cuenta. Cada sucursal tiene sus propias series, caja y usuarios asignados.',
    accent: 'Multi sede',
  },
  {
    icon: 'network',
    title: 'Todo en un solo sistema',
    description: 'Activa solo las herramientas que necesitas. Inventario, compras, caja, restaurante y más se conectan sin duplicar datos.',
    accent: 'Integrado',
  },
  {
    icon: 'plate',
    title: 'Especializado para restaurantes',
    description: 'Bendey Resto conecta mesas, cocina y facturación en un flujo continuo. Ideal para restaurantes, cafeterías y dark kitchens.',
    accent: 'Resto',
  },
  {
    icon: 'chart',
    title: 'Reportes en tiempo real',
    description: 'Ventas del día, stock actual, compras del mes, rentabilidad por producto. Información disponible en el momento que la necesitas.',
    accent: 'Reportes',
  },
  {
    icon: 'shield',
    title: 'Control de acceso por roles',
    description: 'Define exactamente qué puede ver y hacer cada usuario. Permisos granulares por módulo, acción y sucursal.',
    accent: 'Seguridad',
  },
]
</script>

<template>
  <section id="caracteristicas" class="bg-white px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
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

      <!-- Tarjetas planas: son datos informativos, no elementos accionables, por eso
           no llevan el hover de "levantarse" que sí tiene el catálogo de Módulos. -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="feat in features"
          :key="feat.title"
          class="flex flex-col rounded-xl border-2 border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-bendey-gold"
        >
          <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-bendey-gold/15 text-bendey-navy">
            <AppIcon :name="feat.icon" class="h-5 w-5" />
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
