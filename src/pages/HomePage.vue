<script setup>
import { usePlans } from '../composables/usePlans.js'
import { brand, homeNavigation } from '../config/brand.js'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import Modules from '../components/Modules.vue'
import Features from '../components/Features.vue'
import HowItWorks from '../components/HowItWorks.vue'
import Benefits from '../components/Benefits.vue'
import AppsPreview from '../components/AppsPreview.vue'
import DownloadsTeaser from '../components/DownloadsTeaser.vue'
import Pricing from '../components/Pricing.vue'
import CTA from '../components/CTA.vue'
import Footer from '../components/Footer.vue'

defineEmits(['register'])

const { plans } = usePlans()
</script>

<template>
  <div id="inicio" class="relative min-h-screen text-slate-800">
    <div class="relative overflow-hidden">
      <Navbar
        :brand="brand"
        :navigation="homeNavigation"
        @register="$emit('register')"
      />

      <main class="flex flex-col pt-20">
        <Hero :brand="brand" @register="$emit('register')" />
        <AppsPreview @register="$emit('register')" />
        <Modules />
        <Features />
        <HowItWorks />
        <Benefits />
        <DownloadsTeaser @register="$emit('register')" />
        <Pricing @select-plan="$emit('register', $event)" />
        <CTA @register="$emit('register')" />
      </main>

      <Footer :brand="brand" />
    </div>
  </div>
</template>
