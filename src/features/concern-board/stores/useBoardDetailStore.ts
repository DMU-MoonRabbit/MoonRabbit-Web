import { create } from 'zustand'

import axios from '@/api/axios'

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
  createdAt: string
}

interface BoardDetailStore {
  boardDetail: BoardDetail | null
  isLoading: boolean
  error: string | null
  fetchBoardDetail: (id: number) => Promise<void>
  fetchAiAnswer: (boardId: number) => Promise<void>
  setAiAnswer: (aiAnswer: string) => void
}

export const useBoardDetailStore = create<BoardDetailStore>((set) => ({
  boardDetail: null,
  isLoading: false,
  error: null,

  fetchBoardDetail: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(
        `https://moonrabbit-api.kro.kr/api/boards/list/${id}`,
      )
      set({
        boardDetail: response.data,
        isLoading: false,
      })
      // 게시글 정보 로드 후 AI 답변도 함께 로드
      const aiResponse = await axios.get(
        `https://moonrabbit-api.kro.kr/api/board/${id}/assistant`,
      )
      set((state) => ({
        boardDetail: state.boardDetail
          ? { ...state.boardDetail, aiAnswer: aiResponse.data.reply }
          : null,
      }))
    } catch {
      set({
        error: '게시글을 불러오는데 실패했습니다.',
        isLoading: false,
      })
    }
  },

  fetchAiAnswer: async (boardId: number) => {
    try {
      const response = await axios.get(
        `https://moonrabbit-api.kro.kr/api/board/${boardId}/assistant`,
      )
      set((state) => ({
        boardDetail: state.boardDetail
          ? { ...state.boardDetail, aiAnswer: response.data.reply }
          : {
              userId: 0,
              title: '',
              content: '',
              category: '',
              answers: [],
              aiAnswer: response.data.reply,
              createdAt: '',
            },
      }))
    } catch {
      set({
        error: 'AI 답변을 불러오는데 실패했습니다.',
      })
    }
  },

  setAiAnswer: (aiAnswer) =>
    set((state) => ({
      boardDetail: state.boardDetail
        ? { ...state.boardDetail, aiAnswer }
        : null,
    })),
}))
