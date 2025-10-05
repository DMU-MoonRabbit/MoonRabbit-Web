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
        console.warn('로그인이 필요합니다.');
        return;
      }

      const { pageInfo } = get()
      const response = await axios.get(
        `https://moonrabbit-api.kro.kr/api/boards/my?page=${page}&size=100`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const boards: Board[] = response.data.content || []
      const concerns = boards.map(transformBoardToConcern)

      set({
        concerns,
        filteredConcerns: concerns,
        pageInfo: {
          totalPages: response.data.totalPages || 0,
          totalElements: response.data.totalElements || boards.length,
          first: response.data.first ?? true,
          last: response.data.last ?? true,
          size: response.data.size || 100,
          number: response.data.number || page,
          numberOfElements: response.data.numberOfElements || boards.length,
          empty: response.data.empty ?? (boards.length === 0),
        },
      })
    } catch (error) {
      console.error('마이페이지 고민 목록 조회 실패:', error)
      // 에러 발생 시 기존 데이터는 유지하고 빈 결과만 설정
      set({
        concerns: [],
        filteredConcerns: [],
        pageInfo: {
          totalPages: 0,
          totalElements: 0,
          first: true,
          last: true,
          size: 2,
          number: page,
          numberOfElements: 0,
          empty: true,
        },
      })
    }
  },
}))
