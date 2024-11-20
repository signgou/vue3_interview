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
    }
  },
  actions: {
    initSocket() {
      this.socket.disconnect()
      this.socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
        query: { username: this.username, role: 'expert' },
      })
    },
    linkStudent(room: string) {
      this.socket.emit('join', room)
    },
  },
  getters: {},
})

export default useExpertStore
