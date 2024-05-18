export interface Task {
  id: string
  title: string
  description: string
}

export interface TaskChange {
  id: string
  columnName: string
  currentTitle: string
  currentDescription: string
}
