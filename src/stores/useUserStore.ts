import { create } from 'zustand'

interface UserState {
  userId: number
  email: string
  nickname: string
  phoneNum: string
  verification: string
  password: string
  passwordConfirm: string
  setUserId: (userId: number) => void
  setEmail: (email: string) => void
  setNickname: (nickname: string) => void
  setPhoneNum: (phoneNum: string) => void
  setVerification: (verification: string) => void
  setPassword: (password: string) => void
  setPasswordConfirm: (passwordConfirm: string) => void
}

const useUserStore = create<UserState>((set) => ({
  userId: 0,
  email: '',
  nickname: '',
  phoneNum: '',
  verification: '',
  password: '',
  passwordConfirm: '',
  setUserId: (userId) => set({ userId }),
  setEmail: (email) => set({ email }),
  setNickname: (nickname) => set({ nickname }),
  setPhoneNum: (phoneNum) => set({ phoneNum }),
  setVerification: (verification) => set({ verification }),
  setPassword: (password) => set({ password }),
  setPasswordConfirm: (passwordConfirm) => set({ passwordConfirm }),
}))

export default useUserStore
