/**
 * Composable para detectar cuando un elemento entra en el viewport.
 * Usado para animaciones fade-in al hacer scroll.
 */
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useInView(options = {}) {
  const elementRef = ref(null)
  const isInView = ref(false)
  const { threshold = 0.1, rootMargin = '0px' } = options
  let observer = null

  onMounted(async () => {
    await nextTick()
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isInView.value = true
        }
      },
      { threshold, rootMargin }
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
    }
  })

  return { elementRef, isInView }
}
