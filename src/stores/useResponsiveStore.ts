import { create } from 'zustand'

type ResType = 'pc' | 'mo'

interface ResponsiveState {
  res: ResType
  setRes: (value: ResType) => void
}

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  res: window.innerWidth >= 768 ? 'pc' : 'mo',
  setRes: (value) => set({ res: value }),
}))