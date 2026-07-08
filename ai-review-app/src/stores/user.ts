import { defineStore } from 'pinia'
import type { UserInfo } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: uni.getStorageSync('accessToken') || '',
    refreshToken: uni.getStorageSync('refreshToken') || '',
    userInfo: null as UserInfo | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    setToken(accessToken: string, refreshToken: string) {
      this.token = accessToken
      this.refreshToken = refreshToken
      uni.setStorageSync('accessToken', accessToken)
      uni.setStorageSync('refreshToken', refreshToken)
    },

    clearToken() {
      this.token = ''
      this.refreshToken = ''
      this.userInfo = null
      uni.removeStorageSync('accessToken')
      uni.removeStorageSync('refreshToken')
    },

    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
  },
})
