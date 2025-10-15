import { create } from 'zustand'
import { AdminUserResponse } from '../types/admin'

interface ManageUsersState {
  // 데이터 상태
  pageData: AdminUserResponse | null
  loading: boolean
  setPageData: (data: AdminUserResponse | null) => void
  setLoading: (loading: boolean) => void

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
  setPageData: (data) => set({ pageData: data }),
  setLoading: (loading) => set({ loading }),

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
    editModalState: {
      isOpen: false,
      type: null,
      userId: null,
      userName: '',
      currentValue: 0,
    },
  })
}))

