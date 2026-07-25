<script setup>
import { relatedTo } from '~/config/seoRoutes.js'

useSeo({
  title: 'Sistema para Restaurantes: comandas, mesas y facturación | Bendey Cloud',
  description:
    'Bendey Resto conecta mesas, cocina y facturación en un flujo continuo. Ideal para restaurantes, cafeterías y dark kitchens. Prueba gratis.',
})
useSoftwareApplicationSchema({
  name: 'Bendey Resto — Sistema para restaurantes',
  description:
    'Gestiona mesas, órdenes de cocina y carta digital, integrado con facturación electrónica.',
})
</script>

<template>
  <SeoLanding
    eyebrow="Restaurantes"
    h1="Sistema para Restaurantes: comandas, mesas y facturación"
    lead="Bendey Resto es el módulo especializado para restaurantes y cafeterías. Gestiona mesas, órdenes de cocina y carta digital, integrado con facturación electrónica."
    :blocks="[
      {
        title: 'Especializado para restaurantes',
        description:
          'Bendey Resto conecta mesas, cocina y facturación en un flujo continuo. Ideal para restaurantes, cafeterías y dark kitchens.',
      },
      {
        title: 'Cocina en tiempo real',
        description:
          'Las órdenes llegan a las pantallas de cocina al instante y la carta digital se configura desde el sistema.',
      },
    ]"
    :bullets="[
      'Gestión de mesas por piso',
      'Pantallas de cocina en tiempo real',
      'Carta digital configurable',
      'Integrado con facturación',
    ]"
    :related="relatedTo('/restaurantes')"
  />
</template>
