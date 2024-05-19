import type { Store } from 'pinia'
import { NAME_STORE, BACKLOG } from '~/stores/general/constants'
import { Actions } from '~/stores/general/interfaces/action.interface.ts'
import { ColumnName, State, Task, TaskForChange } from '~/stores/general/interfaces/state.interface.ts'
import { Getters } from '~/stores/general/getters.ts'

const actions: Actions = {
  createTaskForBacklog(this: Store<typeof NAME_STORE, State, Getters, Actions>, task: Task): void {
    this.columnTasks[BACKLOG].unshift(task)
  },
  editTask(this: Store<typeof NAME_STORE, State, Getters, Actions>, { id, columnName, currentTitle, currentDescription }: TaskForChange): void {
    const currentIndex = this.columnTasks[columnName].findIndex(task => task.id === id)
    if (currentIndex === -1) return

    this.columnTasks[columnName][currentIndex].title = currentTitle
    this.columnTasks[columnName][currentIndex].description = currentDescription
  },
  deleteTask(this: Store<typeof NAME_STORE, State, Getters, Actions>, id: string, columnName: ColumnName): void {
    const newList = this.columnTasks[columnName].filter(task => task.id !== id)
    this.updateColumnList(columnName, newList)
  },
  updateColumnList(this: Store<typeof NAME_STORE, State, Getters, Actions>, columnName: ColumnName, list: Task[]) {
    this.columnTasks[columnName] = list
  },
  changeModalState(this: Store<typeof NAME_STORE, State, Getters, Actions>, state: boolean ): void {
    this.isOpenModal = state
  },
  modalChangeUpdateState(this: Store<typeof NAME_STORE, State, Getters, Actions>, taskForChange: TaskForChange | null): void {
    this.changeModal = taskForChange
  }
}

export default actions
