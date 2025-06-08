import { create } from 'zustand'
import axios from 'axios'

interface Answer {
  userId: number
  boardId: number
  content: string
  createdAt: string
}

interface Board {
  boardId: number
  userId: number
  title: string
  content: string
  category: string
  answers: Answer[]
}

interface Concern {
  id: number
  profileImage: string
  title: string
  category: string
  content: string
  recentComment: {
    author: string
    text: string
  }
  date: string
  backgroundImage: string
}

interface ConcernStore {
  // 고민 데이터
  concerns: Concern[]
  selectedCategory: string
  filteredConcerns: Concern[]

  // 모달 상태
  isModalOpen: boolean
  newConcernTitle: string
  newConcernContent: string
  newConcernCategory: string

  // 상태
  setSelectedCategory: (category: string) => void
  setIsModalOpen: (isOpen: boolean) => void
  setNewConcernTitle: (title: string) => void
  setNewConcernContent: (content: string) => void
  setNewConcernCategory: (category: string) => void
  resetForm: () => void
  fetchConcerns: () => Promise<void>
}

const transformBoardToConcern = (board: Board): Concern => {
  return {
    id: board.boardId,
    profileImage: 'images/MoonRabbitLogo.png',
    title: board.title,
    category: board.category,
    content: board.content,
    recentComment:
      board.answers.length > 0
        ? {
            author: '달토끼',
            text: board.answers[0].content,
          }
        : {
            author: '달토끼',
            text: '아직 답변이 없어요. 첫 답변을 남겨보세요!',
          },
    date: new Date(board.answers[0]?.createdAt || new Date())
      .toISOString()
      .split('T')[0],
    backgroundImage: '/images/ConcernBackground.png',
  }
}

export const useConcernStore = create<ConcernStore>((set, get) => ({
  concerns: [],
  selectedCategory: '전체',
  filteredConcerns: [],
  isModalOpen: false,
  newConcernTitle: '',
  newConcernContent: '',
  newConcernCategory: '학교',

  setSelectedCategory: (category) => {
    const { concerns } = get()
    const filtered =
      category === '전체'
        ? concerns
        : concerns.filter((concern) => concern.category === category)

    set({
      selectedCategory: category,
      filteredConcerns: filtered,
    })
  },

  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setNewConcernTitle: (title) => set({ newConcernTitle: title }),
  setNewConcernContent: (content) => set({ newConcernContent: content }),
  setNewConcernCategory: (category) => set({ newConcernCategory: category }),

  resetForm: () =>
    set({
      newConcernTitle: '',
      newConcernContent: '',
      newConcernCategory: '학교',
    }),

  fetchConcerns: async () => {
    try {
      const response = await axios.get(
        'http://moonrabbit-api.kro.kr/api/boards/list',
      )
      const boards: Board[] = response.data.content
      const concerns = boards.map(transformBoardToConcern)

      set({
        concerns,
        filteredConcerns: concerns,
      })
    } catch (error) {
      console.error('Failed to fetch concerns:', error)
    }
  },
}))
