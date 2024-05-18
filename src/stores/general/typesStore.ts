import { Task, TaskChange } from '~/stores/general/interfaces.ts'

export interface State {
  columnTasks: Record<string, Task[]>,
  isOpenModal: boolean,
  changeModal: TaskChange | null
}

export interface Actions {
  createTaskForBacklog: (task: Task) => void
  editTask: ({ id, name, newTitle, newDescription }: { id: string, name: string, newTitle: string, newDescription: string }) => void,
  deleteTask: (id: string, name: string) => void
  updateColumnList: (name: string, tasks: Task[]) => void
  changeModalState: (state: boolean) => void
  modalChangeUpdateState: (task: TaskChange | null) => void
}
