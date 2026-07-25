<script setup>
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PHONE_DISPLAY, TEL_URL, WHATSAPP_URL } from '../config/contact.js'
import { solutionRoutes, tutorialRoutes } from '../config/seoRoutes.js'

defineProps({
  brand: { type: Object, required: true },
})

const route = useRoute()
const router = useRouter()

// Scroll suave a una sección de la home sin poner el # en la URL (igual que el Navbar).
function scrollToId(id, attempts = 12) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  else if (attempts > 0) requestAnimationFrame(() => scrollToId(id, attempts - 1))
}
async function goToSection(id) {
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }
  scrollToId(id)
}
</script>

<template>
  <footer
    id="contacto"
    class="bg-bendey-navy px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div class="flex items-center gap-4">
          <img
            v-if="brand.logoSrc"
            :src="brand.logoSrc"
            :alt="brand.fullName"
            loading="lazy"
            width="56"
            height="56"
            class="h-14 w-auto object-contain"
          />
          <div class="flex flex-col">
            <span class="text-xl font-bold text-white">{{ brand.name }} <span class="text-base font-semibold text-bendey-gold">{{ brand.subname }}</span></span>
            <p class="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              Gestiona, factura y crece desde un solo lugar. Bendey Cloud integra
              facturación electrónica SUNAT, punto de venta, inventario, compras,
              caja y restaurantes en una plataforma en la nube diseñada para empresas
              peruanas que buscan orden, control y crecimiento sin complicaciones.
            </p>
          </div>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 md:flex md:gap-16">
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Soluciones
            </h3>
            <ul class="mt-4 space-y-2">
              <li v-for="r in solutionRoutes" :key="r.to">
                <NuxtLink :to="r.to" class="text-slate-300 transition hover:text-bendey-gold">{{ r.label }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Guías
            </h3>
            <ul class="mt-4 space-y-2">
              <li v-for="r in tutorialRoutes" :key="r.to">
                <NuxtLink :to="r.to" class="text-slate-300 transition hover:text-bendey-gold">{{ r.label }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Navegación
            </h3>
            <ul class="mt-4 space-y-2">
              <li><NuxtLink to="/" class="text-slate-300 transition hover:text-bendey-gold">Inicio</NuxtLink></li>
              <li><button type="button" class="cursor-pointer text-slate-300 transition hover:text-bendey-gold" @click="goToSection('modulos')">Módulos</button></li>
              <li><button type="button" class="cursor-pointer text-slate-300 transition hover:text-bendey-gold" @click="goToSection('caracteristicas')">Características</button></li>
              <li><NuxtLink to="/apps" class="text-slate-300 transition hover:text-bendey-gold">Descargar apps</NuxtLink></li>
              <li><NuxtLink to="/precios" class="text-slate-300 transition hover:text-bendey-gold">Precios</NuxtLink></li>
              <li><NuxtLink to="/contacto" class="text-slate-300 transition hover:text-bendey-gold">Contacto</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contacto
            </h3>
            <ul class="mt-4 space-y-2 text-slate-300">
              <li>
                <a :href="TEL_URL" class="transition hover:text-amber-400">
                  Teléfono: {{ PHONE_DISPLAY }}
                </a>
              </li>
              <li>
                <a
                  :href="WHATSAPP_URL"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition hover:text-emerald-400"
                >
                  WhatsApp: {{ PHONE_DISPLAY }}
                </a>
              </li>
              <li>
                <a href="mailto:hola@gestionweb.cloud" class="transition hover:text-amber-400">
                  Correo: hola@gestionweb.cloud
                </a>
              </li>
              <li>Atención: Lunes a Sábado</li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">
              Legal
            </h3>
            <ul class="mt-4 space-y-2">
              <li>
                <NuxtLink to="/terminos" class="text-slate-300 transition hover:text-bendey-gold">
                  Términos y Condiciones
                </NuxtLink>
              </li>
              <li>
                <a
                  href="https://gestionweb.cloud/privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-slate-300 transition hover:text-bendey-gold"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="https://gestionweb.cloud/eliminacion-datos"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-slate-300 transition hover:text-bendey-gold"
                >
                  Eliminación de datos
                </a>
              </li>
              <li>
                <a
                  href="https://gestionweb.cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-slate-300 transition hover:text-bendey-gold"
                >
                  Plataforma GestionWeb Cloud
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
        <p>© {{ new Date().getFullYear() }} {{ brand.fullName }}</p>
        <p class="mt-1 text-xs text-slate-500">
          Un producto de Gestión Web — GestionWeb Cloud, operado por sermush E.I.R.L. · RUC 20612129712
        </p>
      </div>
    </div>
  </footer>
</template>
