// Estado compartido del modal de registro. Reemplaza el encadenado de `emit`
// desde App.vue de la SPA: cualquier componente (Navbar, Hero, CTA, Pricing) abre
// el modal directamente, y el layout lo renderiza una sola vez.
export function useRegister() {
  const open = useState('register-open', () => false)
  const plan = useState('register-plan', () => null)

  function openRegister(selectedPlan = null) {
    // Algunos emisores mandan el evento del DOM; solo aceptamos un plan real.
    plan.value = selectedPlan && typeof selectedPlan === 'object' && 'id' in selectedPlan ? selectedPlan : null
    open.value = true
  }
  function closeRegister() {
    open.value = false
  }

  return { open, plan, openRegister, closeRegister }
}
