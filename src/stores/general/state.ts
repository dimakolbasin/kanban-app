import type { State } from '~/stores/general/typesStore'

const state = (): State => ({
  columnTasks: {
    Backlog: [],
    Progress: [],
    Completed: []
  },
  isOpenModal: false,
  changeModal: null
})

export default state
