import actions from '~/stores/general/actions'
import { NAME_STORE } from '~/stores/general/constants'
import state from '~/stores/general/state'
import { defineStore } from 'pinia'

const useGeneralStore = defineStore(NAME_STORE, {
  state,
  actions,
  persist: {
    // Data(columnTasks) persists from pinia to localStorage
    paths: ['columnTasks']
  }
})

export default useGeneralStore
