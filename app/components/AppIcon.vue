<script setup>
import { ICONS } from '../config/icons.js'

// Único punto de render para el set de íconos de la landing — ver config/icons.js.
// Todas las secciones (Hero, Features, Modules, HowItWorks, Benefits) pasan por acá
// en vez de mezclar SVG a medida, emoji y heroicons sueltos.
defineProps({
  name: { type: String, required: true },
})
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="ICONS[name] || ''"
  />
</template>
