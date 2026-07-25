import { ref, computed, onMounted } from 'vue'
import { apiFetch } from './useApi.js'

/** Plan asignado cuando el usuario se registra sin elegir uno en la landing. */
export function resolveDefaultSignupPlan(plans) {
  if (!plans?.length) return null
  const marked = plans.find((p) => p.is_default_signup)
  if (marked) return marked
  const free = plans.find((p) => p.is_free || p.price === 0)
  return free ?? null
}

export function usePlans() {
  const plans = ref([])
  const loading = ref(true)
  const error = ref(null)

  const defaultSignupPlan = computed(() => resolveDefaultSignupPlan(plans.value))

  onMounted(async () => {
    try {
      const res = await apiFetch('/api/public/plans')
      plans.value = res.data || []
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  return { plans, loading, error, defaultSignupPlan }
}
