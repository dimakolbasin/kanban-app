<script setup lang='ts'>
import useGeneralStore from '~/stores/general'
import { defineProps } from 'vue'
import { Task } from '~/stores/general/interfaces.ts'
const generalStore = useGeneralStore()
const { task, name } = defineProps<{ task: Task, name: string }>()

const editTask = (task: Task, name: string) => {
  generalStore.modalChangeUpdateState({ id: task.id, columnName: name, currentTitle: task.title, currentDescription: task.description })
  generalStore.changeModalState(true)
}

const deleteTask = (task: Task, name: string) => {
  if (confirm(`Are you sure you want to delete this task - #${task.id}?`)) generalStore.deleteTask(task.id, name)
}

</script>

<template>
  <div class="flex gap-x-2">
    <button
      class="w-full"
      @click="editTask(task, name)"
    >
      Edit task
    </button>
    <button
      class="w-full"
      @click="deleteTask(task, name)"
    >
      Delete task
    </button>
  </div>
</template>
