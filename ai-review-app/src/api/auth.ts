import { post } from '@/services/request'

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  nickname: string
  password: string
}

export interface RefreshDto {
  refreshToken: string
}

export interface SendCodeDto {
  phone: string
}

export interface PhoneLoginDto {
  phone: string
  code: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export interface LoginResponse extends TokenPair {
  user: {
    id: string
    email: string
    nickname: string
    avatar: string | null
  }
}

export const authApi = {
  /** 用户注册 */
  register(data: RegisterDto) {
    return post<TokenPair>('/auth/register', data)
  },

  /** 用户登录 */
  login(data: LoginDto) {
    return post<LoginResponse>('/auth/login', data)
  },

  /** 发送手机验证码 */
  sendCode(data: SendCodeDto) {
    return post<{ message: string }>('/auth/send-code', data)
  },

  /** 手机号验证码登录 */
  phoneLogin(data: PhoneLoginDto) {
    return post<LoginResponse>('/auth/phone-login', data)
  },

  /** 刷新 Token */
  refresh(data: RefreshDto) {
    return post<TokenPair>('/auth/refresh', data)
  },
}
