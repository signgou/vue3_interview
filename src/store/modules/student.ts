//user小仓库
import { defineStore } from 'pinia'

const useStudentStore = defineStore('Student', {
  state() {
    return {
      username: '',
    }
  },
  actions: {},
  getters: {},
})

export default useStudentStore
