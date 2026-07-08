const BASE_URL = 'http://localhost:3000/api'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

function getToken(): string | null {
  return uni.getStorageSync('accessToken')
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
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const response = res.data as ApiResponse<T>
          if (response.code !== 0) {
            const message = response.message || '请求失败'
            if (response.code === 10002) {
              // 未登录或登录已过期
              uni.removeStorageSync('accessToken')
              uni.removeStorageSync('refreshToken')
              // 可以在这里触发跳转到登录页
            }
            uni.showToast({ title: message, icon: 'none' })
            reject(new Error(message))
            return
          }
          resolve(response)
        } else if (res.statusCode === 401) {
          uni.removeStorageSync('accessToken')
          uni.removeStorageSync('refreshToken')
          uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
          reject(new Error('Unauthorized'))
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
