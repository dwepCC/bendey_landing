<script setup>
import { relatedTo } from '~/config/seoRoutes.js'

useSeoMeta({
  title: 'Control de Inventario en Tiempo Real | Bendey Cloud',
  description:
    'Control de stock en tiempo real con kardex, movimientos y transferencias entre sucursales. Alertas de stock mínimo. Prueba gratis.',
})
</script>

<template>
  <SeoLanding
    eyebrow="Stock"
    h1="Control de Inventario en Tiempo Real"
    lead="Controla tu stock en tiempo real con kardex, movimientos y transferencias entre sucursales. Recibe alertas de stock mínimo y mantén el inventario siempre al día."
    :blocks="[
      {
        title: 'Kardex y movimientos',
        description:
          'Kardex por producto con ajustes, ingresos y salidas. Cada movimiento queda registrado y valorizado para tus reportes.',
      },
      {
        title: 'Transferencias entre sedes',
        description:
          'Mueve stock entre sucursales y mantén el control centralizado. El inventario se actualiza con cada compra y venta.',
      },
    ]"
    :bullets="[
      'Kardex por producto',
      'Transferencias entre sedes',
      'Ajustes de inventario',
      'Reportes de movimientos',
    ]"
    :related="relatedTo('/inventario')"
  />
</template>
