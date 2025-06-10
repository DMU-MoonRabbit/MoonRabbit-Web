import { create } from 'zustand'
import axios from 'axios'

interface ConcernArticle {
  id: number
  title: string
  profileImage: string
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

export const useConcernDetailStore = create<ConcernState & { fetchConcern: (id: number) => Promise<void> }>((set) => ({
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

  fetchConcern: async (id: number) => {
    try {
      const response = await axios.get(`https://moonrabbit-api.kro.kr/api/boards/list/${id}`)
      const data = response.data
      set(() => ({ concern: data }))
    } catch (error) {
      console.error('고민 데이터 가져오기 실패:', error)
    }
  },
}))
