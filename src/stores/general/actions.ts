import type { Store } from 'pinia'
import type { Actions, State } from '~/stores/general/typesStore'
import type { NAME_STORE } from '~/stores/general/constants'
import { Task, TaskChange } from '~/stores/general/interfaces.ts'

const actions: Actions = {
  createTaskForBacklog(this: Store<typeof NAME_STORE, State, Actions>, task: Task) {
    this.columnTasks['Backlog'].unshift(task)
  },
  editTask(this: Store<typeof NAME_STORE, State, Actions>, { id, name, newTitle, newDescription }: { id: string, name: string, newTitle: string, newDescription: string }) {
    const currentIndex = this.columnTasks[name].findIndex(t => t.id === id)
    this.columnTasks[name][currentIndex].title = newTitle
    this.columnTasks[name][currentIndex].description = newDescription
  },
  deleteTask(this: Store<typeof NAME_STORE, State, Actions>, id, name) {
    const currentIndex = this.columnTasks[name].findIndex(t => t.id === id)
    if (currentIndex !== -1) this.columnTasks[name].splice(currentIndex, 1)
  },
  updateColumnList(this: Store<typeof NAME_STORE, State, Actions>, name: string, list: Task[]) {
    this.columnTasks[name] = list
  },
  changeModalState(this: Store<typeof NAME_STORE, State, Actions>, state: boolean ) {
    this.isOpenModal = state
  },
  modalChangeUpdateState(this: Store<typeof NAME_STORE, State, Actions>, task: TaskChange | null) {
    this.changeModal = task
  }
}

export default actions
