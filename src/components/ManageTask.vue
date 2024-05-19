<script setup lang='ts'>
import useGeneralStore from '~/stores/general'
import { defineProps } from 'vue'
import { ColumnName, Task } from '~/stores/general/interfaces/state.interface.ts'
const generalStore = useGeneralStore()
const { task, columnName, dataId } = defineProps<{ task: Task, columnName: ColumnName, dataId: string }>()

const editTask = (task: Task, columnName: ColumnName) => {
  generalStore.modalChangeUpdateState({ id: task.id, columnName, currentTitle: task.title, currentDescription: task.description })
  generalStore.changeModalState(true)
}

const deleteTask = (task: Task, columnName: ColumnName) => {
  if (confirm(`Are you sure you want to delete this task - #${task.id}?`)) generalStore.deleteTask(task.id, columnName)
}

</script>

<template>
  <div
    :data-id="dataId"
    class="flex gap-x-2"
  >
    <button
      :data-id="dataId"
      class="w-full"
      @click="editTask(task, columnName)"
    >
      Edit task
    </button>
    <button
      :data-id="dataId"
      class="w-full"
      @click="deleteTask(task, columnName)"
    >
      Delete task
    </button>
  </div>
</template>
