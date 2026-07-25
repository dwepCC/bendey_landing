// SEO por página en una sola llamada: title, description, canonical propio, Open
// Graph y Twitter Card. Antes solo existían meta globales en index.html; ahora
// cada ruta tiene los suyos. La imagen OG es la global del sitio salvo override.
const SITE_URL = 'https://bendey.cloud'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export function useSeo({ title, description, image = OG_IMAGE, type = 'website' } = {}) {
  const route = useRoute()
  const url = `${SITE_URL}${route.path}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: url,
    ogImage: image,
    ogSiteName: 'Bendey Cloud',
    ogLocale: 'es_PE',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  })

  // Canonical propio por ruta (Google trata cada URL como única y evita duplicados).
  useHead({
    link: [{ rel: 'canonical', href: url }],
  })
}

// Bloque JSON-LD SoftwareApplication para las páginas de producto. Datos reales:
// Bendey es una BusinessApplication en la nube (web) para Perú.
export function useSoftwareApplicationSchema({ name, description }) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name,
          description,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, Windows, Android',
          publisher: { '@id': `${SITE_URL}/#organization` },
          areaServed: { '@type': 'Country', name: 'Perú' },
        }),
      },
    ],
  })
}
