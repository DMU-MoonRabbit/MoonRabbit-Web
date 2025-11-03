import { create } from 'zustand'

import axios from '@/api/axios'
import ENDPOINTS from '@/api/endpoints'
import {
  Board,
  PageInfo,
  Concern,
  transformBoardToConcern,
} from '@/features/concern-board/stores/useUnifiedConcernStore'

interface MypageStore {
  concerns: Concern[]
  selectedCategory: string
  filteredConcerns: Concern[]
  pageInfo: PageInfo
  totalBoardCount: number
  fetchMyConcerns: (page?: number) => Promise<void>
  fetchTotalBoardCount: () => Promise<void>
  setSelectedCategory: (category: string) => void
  setPage: (page: number) => void
}

export const useMypageStore = create<MypageStore>((set, get) => ({
  concerns: [],
  selectedCategory: '전체',
  filteredConcerns: [],
  totalBoardCount: 0,
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
    const { concerns, pageInfo } = get()
    const selectedCategory = category || '전체'

    // 내 글 필터링
    const filtered =
      selectedCategory === '전체'
        ? concerns
        : concerns.filter((concern) => concern.category === selectedCategory)

    // 페이지당 2개씩 표시하도록 페이징 정보 업데이트
    // 카테고리 변경 시 첫 페이지로 리셋
    const pageSize = 2
    const totalPages = Math.ceil(filtered.length / pageSize)
    const currentPage = 0 // 카테고리 변경 시 첫 페이지로

    set({
      selectedCategory,
      filteredConcerns: filtered,
      pageInfo: {
        ...pageInfo,
        totalPages: totalPages || 1,
        totalElements: filtered.length,
        first: currentPage === 0,
        last: currentPage >= totalPages - 1,
        size: pageSize,
        number: currentPage,
        numberOfElements: Math.min(
          pageSize,
          filtered.length - currentPage * pageSize,
        ),
        empty: filtered.length === 0,
      },
    })
  },

  setPage: (page) => {
    const { pageInfo } = get()
    set({
      pageInfo: {
        ...pageInfo,
        number: page,
        first: page === 0,
        last: page >= pageInfo.totalPages - 1,
      },
    })
  },

  fetchMyConcerns: async (page = 0) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return
      }

      const response = await axios.get(ENDPOINTS.MY_ALL_BOARDS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      // /api/boards/my-all는 페이징 없이 배열을 직접 반환
      const boards: Board[] = Array.isArray(response.data)
        ? response.data
        : response.data.content || []
      const concerns = boards.map(transformBoardToConcern)

      // 현재 선택된 카테고리로 필터링
      const { selectedCategory, pageInfo } = get()
      const filtered =
        selectedCategory === '전체'
          ? concerns
          : concerns.filter((concern: Concern) => concern.category === selectedCategory)

      // 페이지당 2개씩 표시
      const pageSize = 2
      const totalPages = Math.ceil(filtered.length / pageSize)
      const currentPage = Math.min(pageInfo.number, Math.max(0, totalPages - 1))

      set({
        concerns,
        filteredConcerns: filtered,
        totalBoardCount: boards.length,
        pageInfo: {
          totalPages: totalPages || 1,
          totalElements: filtered.length,
          first: currentPage === 0,
          last: currentPage >= totalPages - 1,
          size: pageSize,
          number: currentPage,
          numberOfElements: Math.min(
            pageSize,
            filtered.length - currentPage * pageSize,
          ),
          empty: filtered.length === 0,
        },
      })
    } catch {
      // 에러 발생 시 기존 데이터는 유지하고 빈 결과만 설정
      set({
        concerns: [],
        filteredConcerns: [],
        pageInfo: {
          totalPages: 0,
          totalElements: 0,
          first: true,
          last: true,
          size: 0,
          number: 0,
          numberOfElements: 0,
          empty: true,
        },
      })
    }
  },

  fetchTotalBoardCount: async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return
      }

      const response = await axios.get(
        `https://moonrabbit-api.kro.kr/api/boards/my?page=0&size=100`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      set({
        totalBoardCount: response.data.totalCount || 0,
      })
    } catch {
      set({
        totalBoardCount: 0,
      })
    }
  },
}))
