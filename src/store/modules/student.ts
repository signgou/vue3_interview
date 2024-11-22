//user小仓库
import { defineStore } from 'pinia'

const useStudentStore = defineStore('Student', {
  state() {
    return {
      data: {
        username: '',
      },
    }
  },
  actions: {},
  getters: {},
})

export default useStudentStore
