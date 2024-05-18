import { computed } from 'vue'

export const isTouchDevice = computed(() => {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0))
})