<script setup lang='ts'>
import ManageTask from '~/components/ManageTask.vue'
import { computed, defineAsyncComponent, ref } from 'vue'
import useGeneralStore from '~/stores/general'
import { cloneDeep } from 'lodash'
import { isTouchDevice } from '~/utils'
import { ColumnName, Task } from '~/stores/general/interfaces/state.interface.ts'

const MobileSelectColumn = defineAsyncComponent(() => import('~/components/MobileSelectColumn.vue'))
const MobileManagePriority = defineAsyncComponent(() => import('~/components/MobileManagePriority.vue'))
const generalStore = useGeneralStore()

const DATA_TASK = 'task'
const DATA_FROM_COLUMN = 'fromColumn'
const ITEM_TARGET_CLASS = 'item-target'
const DISABLED_HIGHLIGHT_CLASS = 'not-highlight'
const HIGHLIGHT_CLASS = 'highlight'

const tasksColumn = computed(() => generalStore.columnTasks)

const onDragStart = (event: DragEvent, task: Task, columnName: ColumnName) => {
  const dataTransfer = event.dataTransfer
  const target = event.target as HTMLElement
  if (target.classList.contains(ITEM_TARGET_CLASS) && target === event.currentTarget) {
    target.classList.add(DISABLED_HIGHLIGHT_CLASS)
    currentHoverElement.value = target
  }
  if (dataTransfer) {
    dataTransfer.setData(DATA_TASK, JSON.stringify(task))
    dataTransfer.setData(DATA_FROM_COLUMN, columnName)
  }
}

const changePriorityFromOneColumn = (task: Task, targetId: string, toColumn: ColumnName) => {
  const dropTaskId = task.id
  const tasks = generalStore.columnTasks[toColumn]

  const dropTaskIndex = tasks.findIndex(t => t.id === dropTaskId)
  const targetTaskIndex = tasks.findIndex(t => t.id === targetId)

  if (dropTaskIndex !== -1 && targetTaskIndex !== -1) {
    const deepCopyList = cloneDeep(tasks)
    const dropTask = deepCopyList[dropTaskIndex]
    deepCopyList[dropTaskIndex] = deepCopyList[targetTaskIndex]
    deepCopyList[targetTaskIndex] = dropTask
    generalStore.updateColumnList(toColumn, deepCopyList)
  }
}

const moveTaskBetweenColumns = (task: Task, fromColumn: ColumnName, toColumn: ColumnName, targetIndex: string) => {
  const fromColumnTasks = generalStore.columnTasks[fromColumn].filter(item => item.id !== task.id)
  generalStore.updateColumnList(fromColumn, fromColumnTasks)

  const toColumnTasks = [
    ...generalStore.columnTasks[toColumn].slice(0, +targetIndex),
    task,
    ...generalStore.columnTasks[toColumn].slice(+targetIndex)
  ]
  generalStore.updateColumnList(toColumn, toColumnTasks)
}

const onDrop = (event: DragEvent, toColumn: ColumnName) => {
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) return

  const task: Task = JSON.parse(dataTransfer.getData(DATA_TASK) || '{}')
  const fromColumn = dataTransfer.getData(DATA_FROM_COLUMN) || ''
  const targetIndex = (event.target as HTMLElement).dataset.index || '0'
  const targetId = (event.target as HTMLElement).dataset.id || '0'

  if (fromColumn === toColumn) {
    changePriorityFromOneColumn(task, targetId, toColumn)
  } else {
    moveTaskBetweenColumns(task, (fromColumn as ColumnName), toColumn, targetIndex)
  }
}

const currentHoverElement = ref<HTMLElement | null>(null)

const onDragEnter = (event: DragEvent) => {
  const target = event.target as HTMLElement
  if (target.classList.contains(ITEM_TARGET_CLASS) && target === event.currentTarget) {
    target.classList.add(HIGHLIGHT_CLASS)
    currentHoverElement.value = target
  }
}

const onDragLeave = (event: DragEvent) => {
  const target = event.target as HTMLElement
  if (target.classList.contains(ITEM_TARGET_CLASS) && target === event.currentTarget) {
    target.classList.remove(HIGHLIGHT_CLASS)
  }
}

const onDragEnd = (event: DragEvent) => {
  const target = event.target as HTMLElement
  if (target.classList.contains(ITEM_TARGET_CLASS)) {
    target.classList.remove(HIGHLIGHT_CLASS)
    target.classList.remove(DISABLED_HIGHLIGHT_CLASS)
  }
  currentHoverElement.value?.classList.remove(HIGHLIGHT_CLASS)
}

</script>

<template>
  <div class="flex justify-between w-full">
    <div
      v-for="(tasks, columnName) in tasksColumn"
      :key="columnName"
      class="p-2 border border-gray-300 grow shrink-0 w-full md:w-1/3"
      @dragover.prevent
      @dragenter.prevent
      @drop="onDrop($event, columnName)"
    >
      <h1 class="text-center text-4xl">
        {{ columnName }}
      </h1>
      <div class="min-h-[200px]">
        <div
          v-for="(task, index) in tasks"
          :key="task.id"
          :data-id="task.id"
          class="item-target p-4 my-4 bg-green-50 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg md:cursor-move"
          :draggable="true"
          @dragstart="onDragStart($event, task, columnName)"
          @dragenter="onDragEnter"
          @dragleave="onDragLeave"
          @dragend="onDragEnd"
        >
          <div class="flex flex-col w-fit">
            <span class="w-fit max-w-52 lg:max-w-96 overflow-ellipsis overflow-hidden text-gray-500">
              #: {{ task.id }}
            </span>
            <span class="text-xl md:text-2xl font-semibold w-fit max-w-52 lg:max-w-96 overflow-ellipsis overflow-hidden">
              {{ task.title }}
            </span>
            <span class="mt-2 text-base md:text-xl w-fit max-w-52 lg:max-w-96 overflow-ellipsis overflow-hidden text-gray-600">
              {{ task.description }}
            </span>
          </div>

          <div class="mt-4 mb-4 border-b border-gray-300" />

          <ManageTask
            :task="task"
            :column-name="columnName"
          />
          <template v-if="isTouchDevice">
            <MobileSelectColumn
              :task="task"
              :tasks-column="tasksColumn"
              :from-column="columnName"
            />
            <MobileManagePriority
              :tasks="tasks"
              :position-index="index"
              :name-column="columnName"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.item-target {
  transition: background-color 0.3s ease;

  &.highlight:not(.not-highlight) {
    background-color: rgba(255, 215, 0, 0.5);
  }
}
</style>
