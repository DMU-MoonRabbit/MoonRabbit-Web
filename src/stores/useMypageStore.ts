import { create } from 'zustand'
import axios from "axios"
import { Board, PageInfo, Concern, transformBoardToConcern } from "./useUnifiedConcernStore"
import ENDPOINTS from '../api/endpoints'

interface MypageStore {
  concerns: Concern[]
  selectedCategory: string
  filteredConcerns: Concern[]
  pageInfo: PageInfo
  totalBoardCount: number
  otherUserConcerns: Concern[]
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
        console.warn('로그인이 필요합니다.');
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

  fetchTotalBoardCount: async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.warn('로그인이 필요합니다.');
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
      console.error('전체 게시글 수 조회 실패:', error)
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

      set({
        otherUserConcerns: concerns,
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
      console.error('다른 사용자 고민 목록 조회 실패:', error)
      set({
        otherUserConcerns: [],
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
