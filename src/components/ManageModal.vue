<script setup lang='ts'>
import CreateChangeTask from '~/components/CreateChangeTask.vue'
import useGeneralStore from '~/stores/general'
import { onBeforeMount, onUnmounted } from 'vue'
import { isTouchDevice } from '~/utils'
const generalStore = useGeneralStore()

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') generalStore.changeModalState(false)
}

onBeforeMount(() => {
  if (!isTouchDevice.value) window.addEventListener('keydown', handleKeydown)
  document.documentElement.style.overflowX = 'hidden'
  document.documentElement.style.overflowY = 'hidden'
  document.body.style.overflowX = 'hidden'
  document.body.style.overflowY = 'hidden'
})

onUnmounted(() => {
  if (!isTouchDevice.value) window.removeEventListener('keydown', handleKeydown)
  document.documentElement.style.overflowX = 'auto'
  document.documentElement.style.overflowY = 'auto'
  document.body.style.overflowX = 'auto'
  document.body.style.overflowY = 'auto'
})

</script>

<template>
  <div
    class="w-screen h-full fixed top-0 left-0 h-screen bg-black bg-opacity-50 z-10"
    @click="generalStore.changeModalState(false)"
  >
    <div
      class="absolute rounded-lg flex flex-col gap-y-2 w-screen md:w-80 top-0 md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 bg-white p-4"
      @click.stop
    >
      <CreateChangeTask />
      <button
        class="w-full"
        @click="generalStore.changeModalState(false)"
      >
        Close
      </button>
    </div>
  </div>
</template>
