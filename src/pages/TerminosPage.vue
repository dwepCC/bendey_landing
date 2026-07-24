<script setup>
import { RouterLink } from 'vue-router'
import { brand, homeNavigation } from '../config/brand.js'
import { PHONE_DISPLAY, WHATSAPP_URL } from '../config/contact.js'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

defineEmits(['register'])

const LAST_UPDATED = '18 de julio de 2026'

// Plataforma / operador (misma empresa que GestionWeb Cloud).
const PLATFORM = {
  company: 'sermush E.I.R.L.',
  ruc: '20612129712',
  brand: 'Gestión Web — GestionWeb Cloud',
  site: 'https://gestionweb.cloud/',
  privacy: 'https://gestionweb.cloud/privacidad',
  dataDeletion: 'https://gestionweb.cloud/eliminacion-datos',
  email: 'hola@gestionweb.cloud',
  location: 'Lima, Perú',
}
</script>

<template>
  <div class="relative min-h-screen bg-white text-bendey-navy">
    <!-- Encabezado -->
    <div class="relative isolate overflow-hidden bg-bendey-navy">
      <svg
        class="pointer-events-none absolute right-0 top-0 z-0 h-36 w-36 text-bendey-gold sm:h-48 sm:w-48"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,0 100,0 100,100" fill="currentColor" />
      </svg>

      <Navbar :brand="brand" :navigation="homeNavigation" dark @register="$emit('register')" />

      <section class="relative z-10 mx-auto max-w-3xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <span
          class="mb-5 inline-flex items-center gap-2 rounded-full border border-bendey-gold/30 bg-bendey-gold/10 px-4 py-1.5 text-xs font-semibold text-bendey-gold backdrop-blur"
        >
          Documento legal
        </span>
        <h1 class="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Términos y Condiciones de Servicio
        </h1>
        <p class="mt-4 text-sm text-slate-300">Última actualización: {{ LAST_UPDATED }}</p>
      </section>
    </div>

    <!-- Contenido -->
    <section class="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <article class="mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-slate-700">
        <p>
          Estos Términos y Condiciones (en adelante, los “Términos”) regulan el acceso y uso de
          <strong>{{ brand.fullName }}</strong> ({{ brand.domain }}) y de sus aplicaciones para
          Windows y Android (en adelante, el “Servicio” o la “Plataforma”). Al registrarte, acceder
          o utilizar el Servicio, aceptas estos Términos. Si no estás de acuerdo, no utilices la
          Plataforma.
        </p>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">1. Titular y operador</h2>
          <p class="mt-3">
            {{ brand.fullName }} es un producto de la plataforma
            <strong>{{ PLATFORM.brand }}</strong>, operado por
            <strong>{{ PLATFORM.company }}</strong>, con RUC {{ PLATFORM.ruc }} y domicilio en
            {{ PLATFORM.location }} (en adelante, “nosotros” o “el proveedor”). Bendey y
            GestionWeb Cloud pertenecen al mismo titular y comparten infraestructura, políticas y
            canales de atención.
          </p>
          <ul class="mt-3 list-disc space-y-1 pl-5">
            <li>Correo de contacto: <a class="legal-link" :href="`mailto:${PLATFORM.email}`">{{ PLATFORM.email }}</a></li>
            <li>WhatsApp: <a class="legal-link" :href="WHATSAPP_URL" target="_blank" rel="noopener noreferrer">{{ PHONE_DISPLAY }}</a></li>
            <li>Sitio de la plataforma: <a class="legal-link" :href="PLATFORM.site" target="_blank" rel="noopener noreferrer">gestionweb.cloud</a></li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">2. Descripción del Servicio</h2>
          <p class="mt-3">
            Bendey Cloud es un software de gestión empresarial en la nube que puede incluir, según
            el plan contratado: facturación electrónica ante SUNAT (boletas, facturas, notas y
            comprobantes relacionados), punto de venta (POS), gestión de mesas y comandas para
            restaurantes, inventario, compras, caja y bancos, clientes y reportes. Ofrecemos
            aplicaciones nativas de escritorio y móviles que se conectan a tu cuenta en la nube.
            Las funciones disponibles dependen del plan, del módulo activado y de la configuración
            de cada negocio.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">3. Registro y cuenta</h2>
          <p class="mt-3">
            Para usar el Servicio debes crear una cuenta y proporcionar información veraz, completa
            y actualizada (incluido el RUC de tu empresa cuando corresponda). Eres responsable de
            mantener la confidencialidad de tus credenciales y de toda actividad realizada desde tu
            cuenta. Notifícanos de inmediato cualquier uso no autorizado.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">4. Planes, prueba y pagos</h2>
          <p class="mt-3">
            El Servicio puede ofrecerse con un periodo de prueba gratuito y con planes de pago. Los
            precios, límites y características de cada plan se muestran en la Plataforma y pueden
            actualizarse. La contratación de un plan de pago implica su facturación conforme a la
            periodicidad elegida. La falta de pago puede derivar en la suspensión del acceso a las
            funciones de pago, sin perjuicio de tu derecho a exportar o solicitar tus datos según la
            sección de datos.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">5. Facturación electrónica y responsabilidad tributaria</h2>
          <p class="mt-3">
            Bendey Cloud es un medio tecnológico que facilita la emisión de comprobantes
            electrónicos ante SUNAT. La veracidad, exactitud y legalidad de la información que
            registras y emites (datos del emisor y receptor, importes, impuestos, series y
            correlativos) son de tu exclusiva responsabilidad como contribuyente. El proveedor no es
            responsable por sanciones, contingencias tributarias u observaciones derivadas de datos
            incorrectos, mal uso o incumplimiento de la normativa aplicable por parte del usuario.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">6. Uso aceptable</h2>
          <p class="mt-3">Te comprometes a no utilizar el Servicio para:</p>
          <ul class="mt-3 list-disc space-y-1 pl-5">
            <li>Fines ilícitos, fraudulentos o que infrinjan derechos de terceros.</li>
            <li>Vulnerar, sobrecargar o intentar acceder sin autorización a los sistemas o a datos de otros usuarios.</li>
            <li>Introducir software malicioso o realizar ingeniería inversa del Servicio.</li>
            <li>Revender o ceder el acceso sin nuestra autorización.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">7. Datos personales y privacidad</h2>
          <p class="mt-3">
            El tratamiento de datos personales se rige por la Política de Privacidad de la
            plataforma, aplicable también a Bendey Cloud por pertenecer al mismo titular. Conserva
            la titularidad de la información que cargas en el Servicio. Puedes revisar cómo tratamos
            los datos y ejercer tus derechos aquí:
          </p>
          <ul class="mt-3 list-disc space-y-1 pl-5">
            <li>
              Política de privacidad:
              <a class="legal-link" :href="PLATFORM.privacy" target="_blank" rel="noopener noreferrer">gestionweb.cloud/privacidad</a>
            </li>
            <li>
              Eliminación de cuenta o datos:
              <a class="legal-link" :href="PLATFORM.dataDeletion" target="_blank" rel="noopener noreferrer">gestionweb.cloud/eliminacion-datos</a>
            </li>
          </ul>
          <p class="mt-3">
            El tratamiento se realiza conforme a la Ley N.º 29733, Ley de Protección de Datos
            Personales del Perú, y su reglamento.
          </p>
          <p class="mt-3">
            <strong>Cookies y medición.</strong> Este sitio web usa cookies y tecnologías de
            medición de terceros (entre ellas el píxel de Meta) únicamente para entender cómo se
            navega la web, medir la efectividad de nuestra publicidad y mostrar anuncios más
            relevantes. Estas herramientas se aplican solo a este sitio de presentación: no se
            utilizan dentro de la plataforma de gestión ni en las aplicaciones, donde no se
            comparte con terceros la información de tu negocio. Puedes bloquear o eliminar las
            cookies desde la configuración de tu navegador.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">8. Disponibilidad y soporte</h2>
          <p class="mt-3">
            Trabajamos para mantener el Servicio disponible de forma continua, pero puede haber
            interrupciones por mantenimiento, actualizaciones, fallas de terceros o causas de fuerza
            mayor. El Servicio se ofrece “tal cual” y “según disponibilidad”, sin garantía de
            operación ininterrumpida o libre de errores. Brindamos soporte por los canales oficiales
            indicados en la sección 1.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">9. Propiedad intelectual</h2>
          <p class="mt-3">
            El software, marcas, logotipos, interfaces y contenidos de la Plataforma son propiedad
            de {{ PLATFORM.company }} o de sus licenciantes y están protegidos por la legislación
            vigente. Se te concede una licencia limitada, no exclusiva e intransferible para usar el
            Servicio conforme a estos Términos. Tú conservas los derechos sobre los datos e
            información propia de tu negocio.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">10. Limitación de responsabilidad</h2>
          <p class="mt-3">
            En la máxima medida permitida por la ley, el proveedor no será responsable por daños
            indirectos, lucro cesante, pérdida de datos o perjuicios derivados del uso o
            imposibilidad de uso del Servicio, del incumplimiento de obligaciones a cargo del
            usuario, o de servicios de terceros (incluida SUNAT y proveedores de infraestructura).
            Es responsabilidad del usuario mantener respaldos y verificar la información emitida.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">11. Suspensión y terminación</h2>
          <p class="mt-3">
            Podemos suspender o cancelar el acceso ante incumplimientos de estos Términos, falta de
            pago o uso indebido. Puedes dejar de usar el Servicio y solicitar la eliminación de tu
            cuenta y datos en cualquier momento a través del canal indicado en la sección 7.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">12. Cambios en los Términos</h2>
          <p class="mt-3">
            Podemos actualizar estos Términos para reflejar cambios legales, técnicos o del producto.
            Publicaremos la versión vigente en esta página y, cuando sea relevante, lo notificaremos
            dentro de la aplicación o por los canales de contacto. El uso continuado del Servicio tras
            una actualización implica la aceptación de los nuevos Términos.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">13. Ley aplicable y jurisdicción</h2>
          <p class="mt-3">
            Estos Términos se rigen por las leyes de la República del Perú. Cualquier controversia se
            someterá a los jueces y tribunales competentes de Lima, Perú, sin perjuicio de los
            derechos que la normativa de protección al consumidor reconozca al usuario.
          </p>
        </section>

        <!-- Relación con la plataforma -->
        <section class="rounded-2xl border border-bendey-gray-border bg-slate-50 p-6">
          <h2 class="text-xl font-bold text-bendey-navy">Relación con la plataforma</h2>
          <p class="mt-3">
            {{ brand.fullName }} forma parte de la plataforma <strong>{{ PLATFORM.brand }}</strong>,
            operada por <strong>{{ PLATFORM.company }}</strong> (RUC {{ PLATFORM.ruc }}). Ambos
            productos pertenecen al mismo titular; por ello, las políticas de privacidad y de
            eliminación de datos de la plataforma aplican también a Bendey.
          </p>
          <ul class="mt-4 space-y-2">
            <li>🌐 Plataforma: <a class="legal-link" :href="PLATFORM.site" target="_blank" rel="noopener noreferrer">{{ PLATFORM.site }}</a></li>
            <li>🔒 Política de privacidad: <a class="legal-link" :href="PLATFORM.privacy" target="_blank" rel="noopener noreferrer">{{ PLATFORM.privacy }}</a></li>
            <li>🗑️ Eliminación de datos: <a class="legal-link" :href="PLATFORM.dataDeletion" target="_blank" rel="noopener noreferrer">{{ PLATFORM.dataDeletion }}</a></li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-bendey-navy">14. Contacto</h2>
          <p class="mt-3">
            Para consultas sobre estos Términos:
            <a class="legal-link" :href="`mailto:${PLATFORM.email}`">{{ PLATFORM.email }}</a> ·
            WhatsApp
            <a class="legal-link" :href="WHATSAPP_URL" target="_blank" rel="noopener noreferrer">{{ PHONE_DISPLAY }}</a>.
          </p>
          <p class="mt-6">
            <RouterLink to="/" class="legal-link font-semibold">← Volver al inicio</RouterLink>
          </p>
        </section>
      </article>
    </section>

    <Footer :brand="brand" />
  </div>
</template>

<style scoped>
.legal-link {
  color: #b8860b;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 500;
}
.legal-link:hover {
  color: #8a6508;
}
</style>
