<script setup>
import { relatedTo } from '~/config/seoRoutes.js'

// Copy real, reutilizado de Modules.vue y Features.vue (no se inventa nada).
useSeo({
  title: 'Facturación Electrónica Homologada SUNAT | Bendey Cloud',
  description:
    'Emite boletas, facturas y notas de crédito y débito electrónicas válidas ante SUNAT. Resúmenes diarios automáticos y control de series por sucursal.',
})
useSoftwareApplicationSchema({
  name: 'Bendey Cloud — Facturación electrónica SUNAT',
  description:
    'Emite boletas, facturas y notas de crédito y débito electrónicas válidas ante SUNAT, con resúmenes diarios y series por sucursal.',
})
</script>

<template>
  <SeoLanding
    eyebrow="SUNAT"
    h1="Facturación Electrónica Homologada SUNAT"
    lead="Emite boletas, facturas, notas de crédito y débito electrónicas válidas ante SUNAT. Resúmenes diarios automáticos y control de series por sucursal, sin salir del sistema."
    :blocks="[
      {
        title: 'Integración directa con SUNAT',
        description:
          'Facturación electrónica homologada. Emite comprobantes válidos, envía resúmenes diarios y gestiona bajas sin salir del sistema.',
      },
      {
        title: 'Series por sucursal',
        description:
          'Administra varias sedes desde una sola cuenta. Cada sucursal tiene sus propias series, caja y usuarios asignados.',
      },
    ]"
    :bullets="[
      'Boletas y facturas electrónicas',
      'Notas de crédito y débito',
      'Resúmenes y bajas SUNAT',
      'Series por sucursal',
    ]"
    :related="relatedTo('/facturacion-electronica-sunat')"
  />
</template>
