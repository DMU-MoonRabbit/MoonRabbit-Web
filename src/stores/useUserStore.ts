import { create } from 'zustand'

interface UserState {
  email: string
  nickname: string
  phoneNum: string
  verification: string
  password: string
  passwordConfirm: string
  setEmail: (email: string) => void
  setNickname: (nickname: string) => void
  setPhoneNum: (phoneNum: string) => void
  setVerification: (verification: string) => void
  setPassword: (password: string) => void
  setPasswordConfirm: (passwordConfirm: string) => void
}

const useUserStore = create<UserState>((set) => ({
  email: '',
  nickname: '',
  phoneNum: '',
  verification: '',
  password: '',
  passwordConfirm: '',
  setEmail: (email) => set({ email }),
  setNickname: (nickname) => set({ nickname }),
  setPhoneNum: (phoneNum) => set({ phoneNum }),
  setVerification: (verification) => set({ verification }),
  setPassword: (password) => set({ password }),
  setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
}))

export default useUserStore
