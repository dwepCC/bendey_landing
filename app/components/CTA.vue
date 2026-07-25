<script setup>
import { RouterLink } from 'vue-router'
import { WHATSAPP_URL } from '../config/contact.js'

const emit = defineEmits(['register'])
</script>

<template>
  <section
    id="contacto"
    class="bg-bendey-gray px-4 py-16 sm:px-6 lg:px-8"
  >
    <div class="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div class="space-y-3">
        <h2 class="text-2xl font-bold tracking-tight text-bendey-navy sm:text-3xl">
          Listo para modernizar la facturación de tu negocio
        </h2>
        <p class="max-w-xl text-slate-600">
          Regístrate ahora y accede a tu panel en minutos. Sin contratos rígidos,
          implementación guiada y soporte cercano.
        </p>
        <RouterLink
          to="/apps"
          class="inline-flex items-center gap-1 text-sm font-semibold text-bendey-navy-mid underline-offset-4 hover:text-bendey-gold-dark hover:underline"
        >
          O descarga nuestras apps y prueba primero
        </RouterLink>
      </div>

      <div class="flex flex-col items-start gap-3 md:items-end">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-bendey-gold px-6 py-3 text-base font-bold text-bendey-navy shadow-md transition hover:bg-bendey-gold-dark"
          @click="emit('register')"
        >
          Registrar mi empresa gratis
        </button>
        <a
          :href="WHATSAPP_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-slate-500 underline-offset-4 hover:text-bendey-navy hover:underline"
        >
          ¿Tienes dudas? Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>
