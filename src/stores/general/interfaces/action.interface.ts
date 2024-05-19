import { ColumnName, Task, TaskForChange } from '~/stores/general/interfaces/state.interface.ts'

export interface Actions {
  createTaskForBacklog: (task: Task) => void
  editTask: (taskForChange: TaskForChange) => void
  deleteTask: (id: string, columnName: ColumnName) => void
  updateColumnList: (columnName: ColumnName, tasks: Task[]) => void
  changeModalState: (state: boolean) => void
  modalChangeUpdateState: (taskForChange: TaskForChange | null) => void
}