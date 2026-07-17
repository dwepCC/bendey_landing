import { apiFetch } from './useApi.js'

const STORAGE_KEY = 'bendey_referral'
const SELLER_KEY = 'bendey_referral_seller'

/** Código alfanumérico de referido (7 chars en backend, aceptamos 4–20). */
const CODE_RE = /^[A-Za-z0-9]{4,20}$/

export function normalizeReferralCode(raw) {
  const code = String(raw || '').trim().toUpperCase()
  return CODE_RE.test(code) ? code : ''
}

/** Lee código desde /r/CODE o ?ref= / ?referral= */
export function parseReferralFromUrl(location = window.location) {
  const pathMatch = location.pathname.match(/^\/r\/([A-Za-z0-9]{4,20})\/?$/i)
  if (pathMatch) return normalizeReferralCode(pathMatch[1])

  const params = new URLSearchParams(location.search)
  const fromQuery = params.get('ref') || params.get('referral') || params.get('codigo')
  return normalizeReferralCode(fromQuery)
}

export function getStoredReferral() {
  return normalizeReferralCode(localStorage.getItem(STORAGE_KEY))
}

export function getStoredReferralSeller() {
  return localStorage.getItem(SELLER_KEY) || ''
}

export function storeReferral(code, sellerName) {
  const normalized = normalizeReferralCode(code)
  if (!normalized) return
  localStorage.setItem(STORAGE_KEY, normalized)
  if (sellerName) {
    localStorage.setItem(SELLER_KEY, sellerName)
  }
}

export function clearStoredReferral() {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(SELLER_KEY)
}

/** Quita /r/CODE o query de referido sin recargar (mantiene localStorage). */
export function cleanReferralUrl(location = window.location) {
  const hasPathRef = /^\/r\/[A-Za-z0-9]{4,20}\/?$/i.test(location.pathname)
  const params = new URLSearchParams(location.search)
  const hasQueryRef = params.has('ref') || params.has('referral') || params.has('codigo')

  if (hasPathRef) {
    window.history.replaceState({}, '', '/')
    return
  }

  if (hasQueryRef) {
    params.delete('ref')
    params.delete('referral')
    params.delete('codigo')
    const qs = params.toString()
    window.history.replaceState({}, '', qs ? `/?${qs}` : '/')
  }
}

/** Valida contra GET /api/public/referral/:code */
export async function validateReferral(code) {
  const normalized = normalizeReferralCode(code)
  if (!normalized) {
    return { valid: false, code: '' }
  }
  try {
    const data = await apiFetch(`/api/public/referral/${encodeURIComponent(normalized)}`)
    return {
      valid: true,
      code: data.referral_code || normalized,
      sellerName: data.seller_name || '',
    }
  } catch {
    return { valid: false, code: normalized }
  }
}
