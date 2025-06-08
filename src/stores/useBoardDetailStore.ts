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
}

interface BoardDetailStore {
  boardDetail: BoardDetail | null
  isLoading: boolean
  error: string | null
  fetchBoardDetail: (id: number) => Promise<void>
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
}))
