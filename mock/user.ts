import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/users/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: '登录成功',
      }
    },
  },
] as MockMethod[]
