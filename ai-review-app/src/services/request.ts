const BASE_URL = 'http://localhost:3000/api'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

function getToken(): string | null {
  return uni.getStorageSync('accessToken')
}

function getRefreshToken(): string | null {
  return uni.getStorageSync('refreshToken')
}

function setTokens(accessToken: string, refreshToken: string) {
  uni.setStorageSync('accessToken', accessToken)
  uni.setStorageSync('refreshToken', refreshToken)
}

function clearTokens() {
  uni.removeStorageSync('accessToken')
  uni.removeStorageSync('refreshToken')
}

// 防止并发请求同时刷新 token
let refreshPromise: Promise<boolean> | null = null

function tryRefreshToken(): Promise<boolean> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return Promise.resolve(false)

  if (refreshPromise) return refreshPromise

  refreshPromise = new Promise<boolean>((resolveRefresh) => {
    uni.request({
      url: `${BASE_URL}/auth/refresh`,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: { refreshToken },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const body = res.data as ApiResponse<{ accessToken: string; refreshToken: string }>
          if (body.code === 0 && body.data) {
            setTokens(body.data.accessToken, body.data.refreshToken)
            resolveRefresh(true)
            return
          }
        }
        clearTokens()
        uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
        resolveRefresh(false)
      },
      fail: () => {
        clearTokens()
        resolveRefresh(false)
      },
    })
  }).finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}

export function request<T = any>(
  options: UniApp.RequestOptions
): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    const token = getToken()
    uni.request({
      ...options,
      url: options.url.startsWith('http') ? options.url : `${BASE_URL}${options.url}`,
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.header,
      },
      success: async (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const response = res.data as ApiResponse<T>
          if (response.code !== 0) {
            const message = response.message || '请求失败'
            // 未登录或登录已过期，尝试刷新 token
            if (response.code === 10002) {
              const refreshed = await tryRefreshToken()
              if (refreshed) {
                request<T>(options).then(resolve).catch(reject)
                return
              }
            }
            uni.showToast({ title: message, icon: 'none' })
            reject(new Error(message))
            return
          }
          resolve(response)
        } else if (res.statusCode === 401) {
          const refreshed = await tryRefreshToken()
          if (refreshed) {
            request<T>(options).then(resolve).catch(reject)
          } else {
            clearTokens()
            uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
            reject(new Error('Unauthorized'))
          }
        } else {
          uni.showToast({ title: '网络错误', icon: 'none' })
          reject(new Error('Network Error'))
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络请求失败', icon: 'none' })
        reject(err)
      },
    })
  })
}

export function get<T = any>(url: string, data?: any, header?: any) {
  return request<T>({ url, data, method: 'GET', header })
}

export function post<T = any>(url: string, data?: any, header?: any) {
  return request<T>({ url, data, method: 'POST', header })
}

export function patch<T = any>(url: string, data?: any, header?: any) {
  return request<T>({ url, data, method: 'PATCH', header })
}

export function del<T = any>(url: string, data?: any, header?: any) {
  return request<T>({ url, data, method: 'DELETE', header })
}
