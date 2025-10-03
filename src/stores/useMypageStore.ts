import { create } from 'zustand'
import axios from "axios"
import { Board, PageInfo, Concern, transformBoardToConcern } from "./useUnifiedConcernStore"


interface MypageStore {
  concerns: Concern[]
  selectedCategory: string
  filteredConcerns: Concern[]
  pageInfo: PageInfo
  fetchMyConcerns: (page?: number) => Promise<void>
  setSelectedCategory: (category: string) => void
  setPage: (page: number) => void
}

export const useMypageStore = create<MypageStore>((set, get) => ({
  concerns: [],
  selectedCategory: '전체',
  filteredConcerns: [],
  pageInfo: {
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
    size: 2,
    number: 0,
    numberOfElements: 0,
    empty: true,
  },
  
  setSelectedCategory: (category) => {
    const { concerns } = get()
    const selectedCategory = category || '전체'
    const filtered =
      selectedCategory === '전체'
        ? concerns
        : concerns.filter((concern) => concern.category === selectedCategory)

    set({
      selectedCategory,
      filteredConcerns: filtered,
    })
  },

  
  setPage: (page) => {
    const { pageInfo } = get()
    set({
      pageInfo: {
        ...pageInfo,
        number: page,
      },
    })
  },

  fetchMyConcerns: async (page = 0) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.log('로그인이 필요합니다.');
        return;
      }
      const { pageInfo } = get()
      const response = await axios.get(
        `https://moonrabbit-api.kro.kr/api/boards/my?page=${page}&size=${pageInfo.size}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const boards: Board[] = response.data.content
      const concerns = boards.map(transformBoardToConcern)
  
      set({
        concerns,
        filteredConcerns: concerns,
        pageInfo: {
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          first: response.data.first,
          last: response.data.last,
          size: response.data.size,
          number: response.data.number,
          numberOfElements: response.data.numberOfElements,
          empty: response.data.empty,
        },
      })
    } catch (error) {
      console.error('Failed to fetch concerns:', error)
    }
  },
}))

