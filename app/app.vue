<script setup>
// Schema.org global: Organization + WebSite. Se mantiene desde el index.html de la
// SPA, ahora en un solo lugar para todo el sitio. Las páginas de producto añaden
// su propio SoftwareApplication que referencia #organization.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://bendey.cloud/#organization',
            name: 'Bendey Cloud',
            url: 'https://bendey.cloud',
            logo: { '@type': 'ImageObject', url: 'https://bendey.cloud/bendey.png' },
            description:
              'Software en la nube de facturación electrónica y gestión empresarial para negocios en Perú.',
            areaServed: { '@type': 'Country', name: 'Perú' },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              telephone: '+51931459096',
              availableLanguage: ['es'],
              areaServed: 'PE',
            },
          },
          {
            '@type': 'WebSite',
            '@id': 'https://bendey.cloud/#website',
            url: 'https://bendey.cloud',
            name: 'Bendey Cloud',
            description: 'Facturación electrónica SUNAT y ERP en la nube para empresas peruanas.',
            publisher: { '@id': 'https://bendey.cloud/#organization' },
            inLanguage: 'es-PE',
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
