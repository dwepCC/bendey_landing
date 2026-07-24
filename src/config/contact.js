/** Contacto público — única fuente para teléfono / WhatsApp en la landing. */
export const PHONE_E164 = '+51931459096'
export const PHONE_DISPLAY = '+51 931 459 096'
export const PHONE_WA = '51931459096'

const defaultWaText = encodeURIComponent(
  'Hola, quiero información sobre Bendey Cloud',
)

export const WHATSAPP_URL = `https://wa.me/${PHONE_WA}?text=${defaultWaText}`
export const TEL_URL = `tel:${PHONE_E164}`
