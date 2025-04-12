import { create } from "zustand"

interface AuthState {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
}

const useAuthStore = create<AuthState>((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}))

export default useAuthStore