import { create } from 'zustand'

interface UserState {
  email: string
  phoneNum: string
  verification: string
  password: string
  passwordConfirm: string
  setEmail: (email: string) => void
  setPhoneNum: (phoneNum: string) => void
  setVerification: (verification: string) => void
  setPassword: (password: string) => void
  setPasswordConfirm: (passwordConfirm: string) => void
}

const useAuthStore = create<UserState>((set) => ({
  email: '',
  phoneNum: '',
  verification: '',
  password: '',
  passwordConfirm: '',
  setEmail: (email) => set({ email }),
  setPhoneNum: (phoneNum) => set({ phoneNum }),
  setVerification: (verification) => set({ verification }),
  setPassword: (password) => set({ password }),
  setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
}))

export default useAuthStore
