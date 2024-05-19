<script setup lang='ts'>
import useGeneralStore from '~/stores/general'
import { ColumnName, Task } from '~/stores/general/interfaces/state.interface.ts'
const generalStore = useGeneralStore()

const { tasks, positionIndex, nameColumn } = defineProps<{ tasks: Task[], positionIndex: number, nameColumn: ColumnName }>()

const moveTask = (fromIndex: number, toIndex: number) => {
  const task = tasks[fromIndex]
  const tasksWithoutTask = tasks.slice(0, fromIndex).concat(tasks.slice(fromIndex + 1))
  const newTasks = tasksWithoutTask.slice(0, toIndex).concat(task, tasksWithoutTask.slice(toIndex))
  generalStore.updateColumnList(nameColumn, newTasks)
}

const moveTaskUp = () => {
  if (positionIndex > 0) moveTask(positionIndex, positionIndex - 1)
}

const moveTaskDown = () => {
  if (positionIndex < tasks.length - 1) moveTask(positionIndex, positionIndex + 1)
}

const moveTaskToTop = () => {
  if (positionIndex > 0) moveTask(positionIndex, 0)
}

const moveTaskToBottom = () => {
  if (positionIndex < tasks.length - 1) moveTask(positionIndex, tasks.length - 1)
}

</script>

<template>
  <div class="mt-4 flex gap-2">
    <div
      v-if="positionIndex"
      class="flex gap-2 flex-col w-full"
    >
      <button
        v-if="tasks.length > 2"
        class="w-full"
        @click="moveTaskToTop"
      >
        List Up
      </button>
      <button
        class="w-full"
        @click="moveTaskUp"
      >
        Priority +1
      </button>
    </div>
    <div
      v-if="tasks.length - 1 > positionIndex"
      class="flex gap-2 flex-col w-full"
    >
      <button
        class="w-full"
        @click="moveTaskDown"
      >
        Priority -1
      </button>
      <button
        v-if="tasks.length > 2"
        class="w-full"
        @click="moveTaskToBottom"
      >
        List Bottom
      </button>
    </div>
  </div>
</template>
