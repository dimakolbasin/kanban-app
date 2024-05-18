<script setup lang='ts'>
import useGeneralStore from '~/stores/general'
import { Task } from '~/stores/general/interfaces.ts'
import { cloneDeep } from 'lodash'
const generalStore = useGeneralStore()

const { task, fromColumn, tasksColumn } = defineProps<{ task: Task, fromColumn: string, tasksColumn: Record<string, Task[]> }>()

const moveTaskToColumn = (task: Task, toColumn: string) => {
  if (fromColumn !== toColumn) {
    const fromColumnTasks = generalStore.columnTasks[fromColumn].filter(t => t.id !== task.id)
    generalStore.updateColumnList(fromColumn, fromColumnTasks)

    const toColumnTasks = cloneDeep(generalStore.columnTasks[toColumn])
    toColumnTasks.unshift(task)

    generalStore.updateColumnList(toColumn, toColumnTasks)
  }
}

</script>

<template>
  <select
    class="custom-select border border-gray-400 border-2 rounded-md p-2 w-full mt-4"
    @change="moveTaskToColumn(task, ($event.target as HTMLSelectElement).value)"
  >
    <option
      disabled
      selected
    >
      {{ fromColumn }}
    </option>
    <template
      v-for="(_, colName) in tasksColumn"
      :key="colName"
    >
      <option
        v-if="fromColumn !== colName"
        :value="colName"
      >
        {{ colName }}
      </option>
    </template>
  </select>
</template>
