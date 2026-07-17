/** Contacto público — única fuente para teléfono / WhatsApp en la landing. */
export const PHONE_E164 = '+51912367086'
export const PHONE_DISPLAY = '+51 912 367 086'
export const PHONE_WA = '51912367086'

const defaultWaText = encodeURIComponent(
  'Hola, quiero información sobre Bendey Cloud',
)

export const WHATSAPP_URL = `https://wa.me/${PHONE_WA}?text=${defaultWaText}`
export const TEL_URL = `tel:${PHONE_E164}`
