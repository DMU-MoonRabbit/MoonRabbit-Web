import { create } from 'zustand'
import { User, AdminUserResponse } from '../types/admin'

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
    set({ loading: true })
    setTimeout(() => {
      const allUsers = getMockUsers()
      const pageData = createMockPageData(allUsers, pageNumber, 10)
      set({ pageData, loading: false })
    }, 300)
  }
}))

export const getAdminUsers = async () => {
  const { setPageData, setLoading } = useAdminStore.getState()
  setLoading(true)
  
  try {
    const allUsers = getMockUsers()
    const pageData = createMockPageData(allUsers, 0, 10)
    setPageData(pageData)
  } catch (error) {
    console.error('Initial data load failed:', error)
  } finally {
    setLoading(false)
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
