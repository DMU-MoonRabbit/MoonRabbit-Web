import { create } from 'zustand'
import { AdminUserResponse } from '../types/admin'

interface ManageUsersState {
  // 데이터 상태
  pageData: AdminUserResponse | null
  loading: boolean
  filteredUsers: any[] // 필터링된 전체 사용자 목록 (클라이언트 사이드 페이지네이션용)
  setPageData: (data: AdminUserResponse | null) => void
  setLoading: (loading: boolean) => void
  setFilteredUsers: (users: any[]) => void

  // 포인트/신뢰도 수정 모달
  editModalState: {
    isOpen: boolean
    type: 'point' | 'trust' | null
    userId: number | null
    userName: string
    currentValue: number
  }
  openEditModal: (type: 'point' | 'trust', userId: number, userName: string, currentValue: number) => void
  closeEditModal: () => void

  // 초기화 함수
  reset: () => void
}

export const useManageUsersStore = create<ManageUsersState>((set) => ({
  // 데이터 상태
  pageData: null,
  loading: false,
  filteredUsers: [],
  setPageData: (data) => set({ pageData: data }),
  setLoading: (loading) => set({ loading }),
  setFilteredUsers: (users) => set({ filteredUsers: users }),

  // 포인트/신뢰도 수정 모달
  editModalState: {
    isOpen: false,
    type: null,
    userId: null,
    userName: '',
    currentValue: 0,
  },
  openEditModal: (type, userId, userName, currentValue) => set({
    editModalState: {
      isOpen: true,
      type,
      userId,
      userName,
      currentValue,
    }
  }),
  closeEditModal: () => set({
    editModalState: {
      isOpen: false,
      type: null,
      userId: null,
      userName: '',
      currentValue: 0,
    }
  }),

  // 초기화 함수
  reset: () => set({
    pageData: null,
    loading: false,
    filteredUsers: [],
    editModalState: {
      isOpen: false,
      type: null,
      userId: null,
      userName: '',
      currentValue: 0,
    },
  })
}))

