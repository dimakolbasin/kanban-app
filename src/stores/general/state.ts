import { State } from '~/stores/general/interfaces/state.interface.ts'

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
