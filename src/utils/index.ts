import { computed } from 'vue'

export const isMobileTablet = computed(() => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) || window.innerWidth < 768
})