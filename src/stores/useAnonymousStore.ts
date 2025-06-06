import { create } from 'zustand';

interface AnonymousState {
  anonymous: boolean;
  toggleAnonymous: () => void;
  setAnonymous: (value: boolean) => void;
}

export const useAnonymousStore = create<AnonymousState>((set) => ({
  anonymous: false,
  toggleAnonymous: () =>
    set((state) => ({ anonymous: !state.anonymous })),
  setAnonymous: (value) => set({ anonymous: value }),
}));