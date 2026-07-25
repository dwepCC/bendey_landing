export const brand = {
  name: 'Bendey',
  subname: 'Cloud',
  fullName: 'Bendey Cloud',
  domain: 'bendey.cloud',
  logoSrc: '/bendey.png',
  tagline: 'Plataforma integral para facturación electrónica y gestión empresarial',
}

// `to` = ruta real (RouterLink). `section` = sección de la home; hace scroll suave
// SIN escribir el # en la URL (Módulos/Características no tienen página propia).
export const homeNavigation = [
  { label: 'Inicio', to: '/' },
  { label: 'Módulos', section: 'modulos' },
  { label: 'Características', section: 'caracteristicas' },
  { label: 'Apps', to: '/apps' },
  { label: 'Precios', to: '/precios' },
  { label: 'Contacto', to: '/contacto' },
]

export const appsNavigation = [
  { label: 'Inicio', to: '/' },
  { label: 'Ver ERP', section: 'modulos' },
  { label: 'Precios', to: '/precios' },
  { label: 'Apps', to: '/apps' },
]
