import { create } from "zustand"

interface UserState {
  email: string
  phoneNo: string
  verificationNo: string
  password: string
  confirmPassword: string
  setEmail: (email: string) => void
  setPhoneNo: (phoneNo: string) => void
  setVerificationNo: (verificationNo: string) => void
  setPassword: (password: string) => void
  setConfirmPassword: (confirmPassword: string) => void
}

const useAuthStore = create<UserState>((set) => ({
  email: "",
  phoneNo: "",
  verificationNo: "",
  password: "",
  confirmPassword: "",
  setEmail: (email) => set({ email }),
  setPhoneNo: (phoneNo) => set({ phoneNo }),
  setVerificationNo: (verificationNo) => set({ verificationNo }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
}))

export default useAuthStore