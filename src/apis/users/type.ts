export interface LoginData {
  username: string
  password: string
  role: string
}
export interface LoginRes {
  code: string
  msg: string
  data: string
}

export interface RegisterData {
  username: string
  password: string
  role: string
}

export interface RegisterRes {
  code: string
  msg: string
  data: string
}
