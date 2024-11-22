//user小仓库
import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
const useExpertStore = defineStore('Expert', {
  state() {
    return {
      data: {
        username: '',
      },
      socket: io(),
      first: true,
    } as {
      data: {
        username: string
      }
      socket: Socket
      first: boolean
    }
  },
  actions: {
    initSocket() {
      this.socket.disconnect()
      this.socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
        query: { username: this.data.username, role: 'expert' },
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
