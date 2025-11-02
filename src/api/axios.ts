import axios from 'axios'

import { ENDPOINTS } from './endpoints'

// 재발급 중 플래그 및 대기 중인 요청들을 관리
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// 401 에러 발생 시 Access Token 재발급
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    console.log('[Token Refresh] 재발급 시작')
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      throw new Error('Refresh token이 없습니다.')
    }

    const response = await axios.post(
      ENDPOINTS.REISSUE,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const { accessToken, refreshToken: newRefreshToken } = response.data

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      console.log('[Token Refresh] Access Token 재발급 성공')
    }

    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken)
      console.log('[Token Refresh] Refresh Token 저장 완료')
    }

    return accessToken
  } catch (error) {
    console.error('[Token Refresh] 재발급 실패:', error)
    // Refresh Token도 만료된 경우 로그아웃 처리
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    processQueue(error as Error, null)
    return null
  }
}

// 요청 인터셉터: 모든 요청에 Authorization 헤더 추가
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터: 401 에러 처리 및 토큰 재발급
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // 401 에러이고, 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('[Token Interceptor] 401 에러 감지:', originalRequest.url)
      
      if (isRefreshing) {
        console.log('[Token Interceptor] 재발급 중... 대기열에 추가')
        // 이미 재발급 중이면 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const newAccessToken = await refreshAccessToken()

      if (newAccessToken) {
        processQueue(null, newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        isRefreshing = false
        console.log('[Token Interceptor] 원래 요청 재시도:', originalRequest.url)
        return axios(originalRequest)
      } else {
        isRefreshing = false
        // Refresh Token 재발급 실패 시 로그아웃 및 로그인 페이지로 리다이렉트
        console.log('[Token Interceptor] 로그인 페이지로 리다이렉트')
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export default axios

