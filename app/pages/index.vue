<script setup>
import { brand, homeNavigation } from '~/config/brand.js'

// Estado del modal de registro (compartido, sin encadenar emits por el layout).
const { openRegister } = useRegister()

// SEO base de la home. En la Fase 3 se afina title/description/canonical/OG por
// ruta; aquí queda un título correcto para el prerender.
useSeoMeta({
  title: 'Facturación Electrónica SUNAT y POS para tu negocio en Perú | Bendey Cloud',
  description:
    'Bendey Cloud: facturación electrónica homologada SUNAT, POS, inventario, compras y caja en la nube. Con Bendey Resto para restaurantes. Regístrate gratis.',
})
</script>

<template>
  <div id="inicio" class="relative overflow-hidden">
    <Navbar :brand="brand" :navigation="homeNavigation" @register="openRegister" />

    <main class="flex flex-col pt-20">
      <Hero :brand="brand" @register="openRegister" />
      <AppsPreview @register="openRegister" />
      <Modules />
      <Features />
      <HowItWorks />
      <Benefits />
      <DownloadsTeaser @register="openRegister" />
      <Pricing @select-plan="openRegister" />
      <CTA @register="openRegister" />
    </main>

    <Footer :brand="brand" />
  </div>
</template>
