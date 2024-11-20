import request from '@/utils/request'
import type { loginData, loginRes, registerData, registerRes } from './type'
enum API {
  LOGIN_URL = '/users/login',
  REGISTER_URL = '/users/register',
}
export function login(data: loginData) {
  return request.post<unknown, loginRes>(API.LOGIN_URL, data)
}

export function register(data: registerData) {
  return request.post<unknown, registerRes>(API.REGISTER_URL, data)
}
