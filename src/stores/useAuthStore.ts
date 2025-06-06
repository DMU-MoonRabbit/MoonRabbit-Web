import { create } from "zustand"

interface AuthState {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
}
export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}))

interface AuthFormState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}
export const useAuthFormStore = create<AuthFormState>((set) => ({
  isLogin: true,
  setIsLogin: (isLogin) => set({ isLogin }),
}))