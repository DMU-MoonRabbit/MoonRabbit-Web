import { create } from 'zustand'
import { AdminUserResponse } from '../types/admin'
import { ENDPOINTS } from '@/api/endpoints'
import axios from 'axios'

interface AdminState {
  activeTab: 'members' | 'posts' | 'dailyQuestion' | 'shopItems'
  searchTerm: string
  pageData: AdminUserResponse | null
  loading: boolean
  isSearching: boolean
  setActiveTab: (tab: 'members' | 'posts' | 'dailyQuestion' | 'shopItems') => void
  setSearchTerm: (term: string) => void
  setPageData: (data: AdminUserResponse | null) => void
  setLoading: (loading: boolean) => void
  handleSearch: () => Promise<void>
  clearSearch: () => void
}

export const useAdminStore = create<AdminState>((set, get) => ({
  activeTab: 'members',
  searchTerm: '',
  pageData: null,
  loading: false,
  isSearching: false,
  setActiveTab: (tab) => set({ activeTab: tab, searchTerm: '', isSearching: false }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setPageData: (data) => set({ pageData: data }),
  setLoading: (loading) => set({ loading }),
  handleSearch: async () => {
    const { searchTerm } = get()
    if (!searchTerm.trim()) {
      // 검색어가 비어있으면 검색 상태 해제
      set({ isSearching: false })
      return
    }
    // 검색 상태 설정 (컴포넌트가 이를 감지하여 검색 실행)
    set({ isSearching: true })
  },
  clearSearch: () => set({ searchTerm: '', isSearching: false })
}))

export const getAdminUsers = async (page = 0, size = 10) => {
  const { setPageData, setLoading } = useAdminStore.getState()
  setLoading(true)
  
  try {
    const token = localStorage.getItem('accessToken')
    
    const response = await axios.get(ENDPOINTS.ADMIN_USERS(page, size), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    
    setPageData(response.data)
    setLoading(false)

  } catch (error) {
    // 에러 발생 시 빈 데이터로 설정
    setPageData({
      totalElements: 0,
      totalPages: 0,
      first: true,
      last: true,
      size: size,
      content: [],
      number: page,
      sort: [],
      numberOfElements: 0,
      pageable: {
        offset: page * size,
        sort: [],
        pageNumber: page,
        pageSize: size,
        paged: true,
        unpaged: false
      },
      empty: true
    })
    setLoading(false)
  }
}

export const updateUserPoint = async (userId: number, newPoint: number) => {
  try {
    const token = localStorage.getItem('accessToken')
    
    if (!token) {
      throw new Error('로그인이 필요합니다.')
    }
    
    const response = await axios.put(
      ENDPOINTS.ADMIN_USER_UPDATE_POINT(userId, newPoint),
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        withCredentials: true
      }
    )
    
    return response.data
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('관리자 권한이 필요합니다.')
      } else if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.')
      }
    }
    throw error
  }
}

export const updateUserTrust = async (userId: number, newTrust: number) => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw new Error('로그인이 필요합니다.')
    }
    
    const response = await axios.put(
      ENDPOINTS.ADMIN_USER_UPDATE_TRUST(userId, newTrust),
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        withCredentials: true
      }
    )
    
    return response.data

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('관리자 권한이 필요합니다.')
      } else if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.')
      }
    }
    throw error
  }
}
