// Set de íconos lineales compartido por toda la landing (Hero, Features, Modules,
// HowItWorks, Benefits). Antes cada sección tenía su propio lenguaje visual (SVG a
// medida en Hero, emoji crudos en el resto, heroicons sueltos en Pricing); ahora todos
// consumen este mismo set a través de AppIcon.vue, con el mismo trazo (stroke-width
// 1.75, currentColor) que ya usaba Hero.
//
// Cada valor es el contenido interno de un <svg viewBox="0 0 24 24">.
export const ICONS = {
  // Reutilizados tal cual del Hero original.
  invoice: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
  boxes: '<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>',
  chart: '<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
  device: '<path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',

  // Nuevos, para los conceptos que antes eran emoji.
  branches: '<rect x="5" y="4" width="14" height="16" rx="1"/><path d="M8.5 8h1.6M13.9 8h1.6M8.5 12h1.6M13.9 12h1.6M8.5 16h1.6M13.9 16h1.6"/>',
  network: '<circle cx="6" cy="6.5" r="2"/><circle cx="18" cy="6.5" r="2"/><circle cx="12" cy="17.5" r="2"/><path d="M7.7 7.8L10.6 15.8M16.3 7.8L13.4 15.8M8 6.5H16"/>',
  plate: '<circle cx="14.5" cy="12" r="6.3"/><path d="M6 3v6a1.3 1.3 0 002.6 0V3M7.3 3v6M4.7 3v6M7.3 9v12"/>',
  shield: '<path d="M12 3L19 6L19 11C19 15.5 16 19 12 20.5C8 19 5 15.5 5 11L5 6Z"/><path d="M9 12l2.2 2.2L15.5 9.8"/>',
  cart: '<circle cx="9.5" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/><path d="M3 4h2.3L8 15.5h9.3L19.5 7H6.4"/>',
  packageIn: '<rect x="4" y="9" width="12" height="10" rx="1"/><path d="M4 13.5h12M8 9V6.5a2 2 0 012-2h1"/><path d="M16.5 8.5l3 3-3 3"/>',
  banknote: '<rect x="3" y="7" width="18" height="11" rx="1.3"/><circle cx="12" cy="12.5" r="2.3"/><path d="M6.5 7v11M17.5 7v11"/>',
  users: '<circle cx="9" cy="9" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><circle cx="17.5" cy="9.5" r="2.2"/><path d="M15.7 14.3c2.4.3 4.3 2.2 4.3 4.7"/>',
  idBadge: '<rect x="4" y="4.5" width="16" height="15" rx="1.5"/><circle cx="9.5" cy="10.3" r="2"/><path d="M6.7 15.8c.4-1.7 1.6-2.5 2.8-2.5s2.4.8 2.8 2.5M14 9h4M14 12h4"/>',
  clipboard: '<rect x="5.5" y="4.5" width="13" height="16" rx="1.3"/><rect x="9" y="3" width="6" height="3" rx="1"/><path d="M8.5 11h7M8.5 14.5h7M8.5 18h4.5"/>',
  sliders: '<path d="M4 6h4M12 6h8M4 12h9M17 12h3M4 18h13M21 18h-1"/><circle cx="8" cy="6" r="2"/><circle cx="13" cy="12" r="2"/><circle cx="19" cy="18" r="2"/>',
  receiptCheck: '<rect x="6" y="3.5" width="12" height="16.5" rx="1"/><path d="M9 8.5h6M9 12h6M9.5 16l1.5 1.5 3-3"/>',
}
