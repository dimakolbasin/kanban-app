export type ColumnName = 'Backlog' | 'Progress' | 'Completed'

export interface State {
  columnTasks: Record<ColumnName, Task[]>,
  isOpenModal: boolean,
  changeModal: TaskForChange | null
}

export interface Task {
  id: string
  title: string
  description: string
}

export interface TaskForChange {
  id: string
  columnName: ColumnName
  currentTitle: string
  currentDescription: string
}