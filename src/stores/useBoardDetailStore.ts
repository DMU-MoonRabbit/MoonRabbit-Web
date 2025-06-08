import { create } from 'zustand'
import axios from 'axios'

interface Answer {
  userId: number
  boardId: number
  content: string
  createdAt: string
}

interface BoardDetail {
  userId: number
  title: string
  content: string
  category: string
  answers: Answer[]
  aiAnswer?: string
}

interface BoardDetailStore {
  boardDetail: BoardDetail | null
  isLoading: boolean
  error: string | null
  fetchBoardDetail: (id: number) => Promise<void>
  fetchAiAnswer: (boardId: number, category: string) => Promise<void>
}

export const useBoardDetailStore = create<BoardDetailStore>((set) => ({
  boardDetail: null,
  isLoading: false,
  error: null,

  fetchBoardDetail: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(
        `http://moonrabbit-api.kro.kr/api/boards/list/${id}`,
      )
      set({
        boardDetail: response.data,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: '게시글을 불러오는데 실패했습니다.',
        isLoading: false,
      })
      console.error('Failed to fetch board detail:', error)
    }
  },

  fetchAiAnswer: async (boardId: number, category: string) => {
    try {
      const response = await axios.get(
        `http://moonrabbit-api.kro.kr/api/board/${boardId}/assistant`,
      )
      set((state) => ({
        boardDetail: state.boardDetail
          ? { ...state.boardDetail, aiAnswer: response.data.reply }
          : null,
      }))
    } catch (error) {
      console.error('AI 답변 조회 실패:', error)
      set((state) => ({
        error: 'AI 답변을 불러오는데 실패했습니다.',
      }))
    }
  },
}))
