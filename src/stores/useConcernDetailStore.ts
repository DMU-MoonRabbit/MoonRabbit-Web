// 이 store는 useUnifiedConcernStore로 통합되었습니다. 새로운 고민 관련 상태/메서드는 useUnifiedConcernStore를 사용하세요.
import { create } from 'zustand'
import axios from 'axios'

export interface ConcernArticle {
  id: number
  title: string
  profileImg: string
  nickname: string
  content: string
  createdAt: string
  answer: string
  like: boolean
}

interface ConcernState {
  concern?: ConcernArticle
  setConcern: (concern: ConcernArticle) => void
  toggleConcernLike: () => void
}

export const useConcernDetailStore = create<ConcernState>((set) => ({
  concern: undefined,
  setConcern: (concern) => set(() => ({ concern })),

  toggleConcernLike: () =>
    set((state) => {
      if (!state.concern) return {}
      return {
        concern: {
          ...state.concern,
          like: !state.concern.like,
        },
      }
    }),
}))
