<script setup>
// Enlace de referido bendey.cloud/r/CODIGO: valida el código, lo guarda y lleva a
// la home abriendo el registro. Autónomo (no depende del orden de montaje del
// layout). No se prerenderiza: se resuelve en el cliente vía el fallback SPA.
import { normalizeReferralCode, storeReferral, validateReferral } from '~/composables/useReferral.js'

const route = useRoute()
const { openRegister } = useRegister()

// Sin contenido indexable: es una redirección funcional, fuera del sitemap.
definePageMeta({ sitemap: false })
useSeoMeta({ robots: 'noindex' })

onMounted(async () => {
  const code = normalizeReferralCode(route.params.code)
  if (code) {
    try {
      const res = await validateReferral(code)
      if (res.valid) {
        storeReferral(res.code, res.sellerName)
        openRegister()
      }
    } catch {
      /* si la validación falla, igual llevamos a la home */
    }
  }
  await navigateTo('/', { replace: true })
})
</script>

<template>
  <div class="min-h-screen" />
</template>
