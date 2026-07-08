import { get, patch } from '@/services/request'

export interface UserInfo {
  id: string
  email: string
  nickname: string
  avatar: string | null
  bio: string | null
  createdAt: string
}

export interface UpdateUserDto {
  nickname?: string
  avatar?: string
  bio?: string
}

export const userApi = {
  /** 获取当前用户信息 */
  getMe() {
    return get<UserInfo>('/users/me')
  },

  /** 更新当前用户信息 */
  updateMe(data: UpdateUserDto) {
    return patch<UserInfo>('/users/me', data)
  },
}
