import { create } from 'zustand'
import axios from "axios"
import { Board, PageInfo, Concern, transformBoardToConcern } from "@/features/concern-board/stores/useUnifiedConcernStore"
import ENDPOINTS from '@/api/endpoints'

interface MypageStore {
  concerns: Concern[]
  selectedCategory: string
  filteredConcerns: Concern[]
  pageInfo: PageInfo
  totalBoardCount: number
  otherUserConcerns: Concern[]
  otherUserFilteredConcerns: Concern[]
  otherUserPageInfo: PageInfo
  otherUserBoardCount: number
  fetchMyConcerns: (page?: number) => Promise<void>
  fetchTotalBoardCount: () => Promise<void>
  fetchOtherUserConcerns: (userId: number, page?: number) => Promise<void>
  setSelectedCategory: (category: string) => void
  setPage: (page: number) => void
  setOtherUserPage: (page: number) => void
}

export const useMypageStore = create<MypageStore>((set, get) => ({
  concerns: [],
  selectedCategory: '전체',
  filteredConcerns: [],
  totalBoardCount: 0,
  otherUserConcerns: [],
  otherUserFilteredConcerns: [],
  otherUserBoardCount: 0,
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
  otherUserPageInfo: {
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
    const { concerns, otherUserConcerns } = get()
    const selectedCategory = category || '전체'
    
    // 내 글 필터링
    const filtered =
      selectedCategory === '전체'
        ? concerns
        : concerns.filter((concern) => concern.category === selectedCategory)

    // 타유저 글 필터링
    const otherUserFiltered =
      selectedCategory === '전체'
        ? otherUserConcerns
        : otherUserConcerns.filter((concern) => concern.category === selectedCategory)

    set({
      selectedCategory,
      filteredConcerns: filtered,
      otherUserFilteredConcerns: otherUserFiltered,
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

  setOtherUserPage: (page) => {
    const { otherUserPageInfo } = get()
    set({
      otherUserPageInfo: {
        ...otherUserPageInfo,
        number: page,
      },
    })
  },

  fetchMyConcerns: async (page = 0) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }

      const response = await axios.get(
        `https://moonrabbit-api.kro.kr/api/boards/my?page=${page}&size=2`,
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
          totalElements: response.data.totalCount || boards.length,
          first: (response.data.pageNumber || page) === 0,
          last: (response.data.pageNumber || page) >= (response.data.totalPages || 1) - 1,
          size: response.data.pageSize || 2,
          number: response.data.pageNumber || page,
          numberOfElements: response.data.content?.length || boards.length,
          empty: boards.length === 0,
        },
      })
    } catch (error) {
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

  fetchTotalBoardCount: async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }

      const response = await axios.get(
        `https://moonrabbit-api.kro.kr/api/boards/my?page=0&size=100`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      set({
        totalBoardCount: response.data.totalCount || 0,
      })
    } catch (error) {
      set({
        totalBoardCount: 0,
      })
    }
  },

  fetchOtherUserConcerns: async (userId: number, page = 0) => {
    try {
      const response = await axios.get(ENDPOINTS.USER_BOARDS_BY_ID(userId, page, 2))
      const boards: Board[] = response.data.content || []
      const concerns = boards.map(transformBoardToConcern)

      const { selectedCategory } = get()
      const otherUserFiltered =
        selectedCategory === '전체'
          ? concerns
          : concerns.filter((concern) => concern.category === selectedCategory)

      set({
        otherUserConcerns: concerns,
        otherUserFilteredConcerns: otherUserFiltered,
        otherUserBoardCount: response.data.totalCount || 0,
        otherUserPageInfo: {
          totalPages: response.data.totalPages || 0,
          totalElements: response.data.totalCount || boards.length,
          first: (response.data.pageNumber || page) === 0,
          last: (response.data.pageNumber || page) >= (response.data.totalPages || 1) - 1,
          size: response.data.pageSize || 2,
          number: response.data.pageNumber || page,
          numberOfElements: response.data.content?.length || boards.length,
          empty: boards.length === 0,
        },
      })
    } catch (error) {
      set({
        otherUserConcerns: [],
        otherUserFilteredConcerns: [],
        otherUserBoardCount: 0,
        otherUserPageInfo: {
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
