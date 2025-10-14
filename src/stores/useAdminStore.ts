import { create } from 'zustand'
import { User, AdminUserResponse } from '../types/admin'
import { ENDPOINTS } from '../api/endpoints'
import axios from 'axios'

interface AdminState {
  activeTab: 'members' | 'posts'
  searchTerm: string
  pageData: AdminUserResponse | null
  loading: boolean
  setActiveTab: (tab: 'members' | 'posts') => void
  setSearchTerm: (term: string) => void
  setPageData: (data: AdminUserResponse | null) => void
  setLoading: (loading: boolean) => void
  handleSearch: () => Promise<void>
  handlePageChange: (pageNumber: number) => Promise<void>
}

export const useAdminStore = create<AdminState>((set, get) => ({
  activeTab: 'members',
  searchTerm: '',
  pageData: null,
  loading: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setPageData: (data) => set({ pageData: data }),
  setLoading: (loading) => set({ loading }),
  handleSearch: async () => {
    const { searchTerm } = get()
    set({ loading: true })
    setTimeout(() => {
      const allUsers = getMockUsers()
      const filteredUsers = allUsers.filter(user => 
        user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      const filteredPageData = createMockPageData(filteredUsers, 0, 10)
      set({ pageData: filteredPageData, loading: false })
    }, 500)
  },

  handlePageChange: async (pageNumber: number) => {
    await getAdminUsers(pageNumber, 10)
  }
}))

export const getAdminUsers = async (page = 0, size = 10) => {
  const { setPageData, setLoading } = useAdminStore.getState()
  setLoading(true)
  
  try {
    const token = localStorage.getItem('accessToken')
    
    const response = await axios.get(ENDPOINTS.ADMIN_USERS(page+1, size), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    
    console.log('회원 목록 API 응답:', response.data)
    setPageData(response.data)
  } catch (error) {
    console.error('회원 목록 조회 실패:', error)
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
  } finally {
    setLoading(false)
  }
}

export const updateUserPoint = async (userId: number, newPoint: number) => {
  try {
    const token = localStorage.getItem('accessToken')
    
    const response = await axios.put(
      ENDPOINTS.ADMIN_USER_UPDATE_POINT(userId),
      { point: newPoint },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    
    console.log('포인트 수정 API 응답:', response.data)
    return response.data
  } catch (error) {
    console.error('포인트 수정 실패:', error)
    throw error
  }
}

export const updateUserTrust = async (userId: number, newTrust: number) => {
  try {
    const token = localStorage.getItem('accessToken')
    
    const response = await axios.put(
      ENDPOINTS.ADMIN_USER_UPDATE_TRUST(userId),
      { trustPoint: newTrust },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    
    console.log('신뢰도 수정 API 응답:', response.data)
    return response.data
  } catch (error) {
    console.error('신뢰도 수정 실패:', error)
    throw error
  }
}

const getMockUsers = (): User[] => [
  {
    id: 1,
    email: "user1@example.com",
    nickname: "달토끼1",
    point: 150,
    trustPoint: 85,
    totalPoint: 235,
    level: 3,
    createdAt: "2024-01-15",
    content: "안녕하세요!"
  },
  {
    id: 2,
    email: "user2@example.com", 
    nickname: "별토끼2",
    point: 200,
    trustPoint: 92,
    totalPoint: 292,
    level: 4,
    createdAt: "2024-01-20",
    content: "좋은 하루 되세요"
  },
  {
    id: 3,
    email: "user3@example.com",
    nickname: "밤토끼3", 
    point: 75,
    trustPoint: 78,
    totalPoint: 153,
    level: 2,
    createdAt: "2024-02-01",
    content: "감사합니다"
  },
  {
    id: 4,
    email: "user4@example.com",
    nickname: "달토끼4",
    point: 300,
    trustPoint: 95,
    totalPoint: 395,
    level: 5,
    createdAt: "2024-01-10",
    content: "반갑습니다"
  },
  {
    id: 5,
    email: "user5@example.com",
    nickname: "별토끼5",
    point: 120,
    trustPoint: 80,
    totalPoint: 200,
    level: 3,
    createdAt: "2024-01-25",
    content: "안녕하세요"
  }
]

const createMockPageData = (users: User[], pageNumber: number = 0, pageSize: number = 10): AdminUserResponse => {
  const totalElements = users.length
  const totalPages = Math.ceil(totalElements / pageSize)
  const startIndex = pageNumber * pageSize
  const endIndex = startIndex + pageSize
  const content = users.slice(startIndex, endIndex)
  
  return {
    totalElements,
    totalPages,
    first: pageNumber === 0,
    last: pageNumber === totalPages - 1,
    size: pageSize,
    content,
    number: pageNumber,
    sort: [],
    numberOfElements: content.length,
    pageable: {
      offset: startIndex,
      sort: [],
      pageNumber,
      pageSize,
      paged: true,
      unpaged: false
    },
    empty: content.length === 0
  }
}
