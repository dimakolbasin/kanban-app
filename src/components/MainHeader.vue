<script setup lang="ts">
import useGeneralStore from '~/stores/general'
const SwipeIcon = defineAsyncComponent(() => import('~/icons/swipe.svg'))
import { computed, defineAsyncComponent } from 'vue'

const generalState = useGeneralStore()
const innerWidth = computed(() => window.innerWidth)
</script>

<template>
  <header class="flex items-center my-4 justify-between">
    <button @click="generalState.changeModalState(true)">
      Create new task
    </button>

    <SwipeIcon
      v-if="innerWidth < 768"
      class="mr-2"
    />
  </header>
</template>
