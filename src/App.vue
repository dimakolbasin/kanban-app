<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import ColumnTasks from "~/components/ColumnTasks.vue"
import useGeneralStore from '~/stores/general'
import MainHeader from '~/components/MainHeader.vue'
const ManageModal = defineAsyncComponent(() => import('~/components/ManageModal.vue'))
const generalState = useGeneralStore()
</script>

<template>
  <div class="container">
    <MainHeader />

    <ColumnTasks />

    <transition
      name="fade"
      mode="out-in"
      appear
    >
      <ManageModal v-if="generalState.isOpenModal" />
    </transition>
  </div>
</template>
