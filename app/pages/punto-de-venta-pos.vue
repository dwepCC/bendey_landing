<script setup>
import { relatedTo } from '~/config/seoRoutes.js'

useSeo({
  title: 'Punto de Venta (POS) para tu negocio en Perú | Bendey Cloud',
  description:
    'Registra ventas rápidamente desde cualquier dispositivo. POS integrado con inventario y facturación electrónica en un solo flujo. Prueba gratis.',
})
useSoftwareApplicationSchema({
  name: 'Bendey Cloud — Punto de venta (POS)',
  description:
    'POS que registra ventas desde cualquier dispositivo, integrado con inventario y facturación electrónica.',
})
</script>

<template>
  <SeoLanding
    eyebrow="Ventas"
    h1="Punto de Venta (POS) para tu negocio"
    lead="Registra ventas rápidamente desde cualquier dispositivo. Integrado con inventario y facturación electrónica en un solo flujo, sin duplicar datos."
    :blocks="[
      {
        title: 'Venta rápida, un solo flujo',
        description:
          'Registra ventas desde cualquier dispositivo. El POS se conecta con inventario y facturación electrónica sin pasos extra.',
      },
      {
        title: 'PC, web y celular',
        description:
          'Vende desde la web o desde las apps nativas para Windows y Android. Los datos quedan centralizados en la nube.',
      },
    ]"
    :bullets="[
      'Venta rápida con buscador',
      'Múltiples métodos de pago',
      'Descuentos y promociones',
      'Historial de ventas',
    ]"
    :related="relatedTo('/punto-de-venta-pos')"
  />
</template>
