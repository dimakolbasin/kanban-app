<script setup lang='ts'>
import useGeneralStore from '~/stores/general'
import { cloneDeep } from 'lodash'
import { ColumnName, Task } from '~/stores/general/interfaces/state.interface.ts'
import { computed } from 'vue'
const generalStore = useGeneralStore()

const { task, fromColumn, tasksColumn } = defineProps<{ task: Task, fromColumn: ColumnName, tasksColumn: Record<ColumnName, Task[]> }>()

const moveTaskToColumn = (task: Task, toColumn: ColumnName) => {
  if (fromColumn !== toColumn) {
    const fromColumnTasks = generalStore.columnTasks[fromColumn].filter(item => item.id !== task.id)
    generalStore.updateColumnList(fromColumn, fromColumnTasks)

    const toColumnTasks = cloneDeep(generalStore.columnTasks[toColumn])
    toColumnTasks.unshift(task)

    generalStore.updateColumnList(toColumn, toColumnTasks)
  }
}

const filteredColumnName = computed(() => Object.keys(tasksColumn).filter(colName => colName !== fromColumn))

</script>

<template>
  <select
    class="border-2 select-none border-gray-400 rounded-md p-2 w-full mt-4"
    @change="moveTaskToColumn(task, (($event.target as HTMLSelectElement).value) as ColumnName)"
  >
    <option
      disabled
      selected
    >
      {{ fromColumn }}
    </option>
    <option
      v-for="colName in filteredColumnName"
      :key="colName"
      :value="colName"
    >
      {{ colName }}
    </option>
  </select>
</template>
