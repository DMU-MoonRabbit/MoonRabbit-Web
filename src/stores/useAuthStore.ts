import { create } from 'zustand'

interface AuthState {
  email: string
  password: string
  isLoggedIn: boolean
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
}
export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  isLoggedIn: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}))

interface AuthFormState {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}
export const useAuthFormStore = create<AuthFormState>((set) => ({
  isLogin: true,
  setIsLogin: (isLogin) => set({ isLogin }),
}))
