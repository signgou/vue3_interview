//user小仓库
import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
const useExpertStore = defineStore('Expert', {
  state() {
    return {
      username: '',
      socket: io(),
      first: true,
    } as {
      username: string
      socket: Socket
      first: boolean
    }
  },
  actions: {
    initSocket() {
      this.socket.disconnect()
      this.socket = io('https://192.168.29.254:3000', {
        query: { username: this.username, role: 'expert' },
      })
      this.first = false
    },
    linkStudent(room: string) {
      this.socket.emit('join', room)
    },
  },
  getters: {},
})

export default useExpertStore
