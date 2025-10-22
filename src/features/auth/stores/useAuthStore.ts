import { create } from 'zustand'

interface User {
  id?: number
  nickname?: string
  email?: string
  [key: string]: unknown
}

interface AuthState {
  email: string
  password: string
  isLoggedIn: boolean
  user: User | null
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setUser: (user: User | null) => void
  logout: () => void
}
export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  isLoggedIn: false,
  user: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user }),
  logout: () => {
    // 로컬 스토리지 정리
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    // 상태 초기화
    set({
      email: '',
      password: '',
      isLoggedIn: false,
      user: null,
    })
  },
}))

interface AuthFormState {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}
export const useAuthFormStore = create<AuthFormState>((set) => ({
  isLogin: true,
  setIsLogin: (isLogin) => set({ isLogin }),
}))
