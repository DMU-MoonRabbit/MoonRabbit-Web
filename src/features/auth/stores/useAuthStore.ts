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
}))

interface AuthFormState {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}
export const useAuthFormStore = create<AuthFormState>((set) => ({
  isLogin: true,
  setIsLogin: (isLogin) => set({ isLogin }),
}))
