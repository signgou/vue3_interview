import request from '@/utils/request'
import type { LoginData, LoginRes, RegisterData, RegisterRes } from './type'
enum API {
  LOGIN_URL = '/users/login',
  REGISTER_URL = '/users/register',
}
export function login(data: LoginData) {
  return request.post<unknown, LoginRes>(API.LOGIN_URL, data)
}

export function register(data: RegisterData) {
  return request.post<unknown, RegisterRes>(API.REGISTER_URL, data)
}
