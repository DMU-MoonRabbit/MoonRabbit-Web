import { create } from 'zustand'
import { BoardPageData } from '@/features/concern-board/types/board'
import { AdminReportsResponse } from '../types/admin'

interface ManageBoardState {
  // 탭 관리
  activeTab: 'posts' | 'reportedBoards' | 'reportedComments'
  setActiveTab: (tab: 'posts' | 'reportedBoards' | 'reportedComments') => void

  // 데이터 상태
  boardData: BoardPageData | null
  reportedBoardsData: AdminReportsResponse | null
  reportedCommentsData: AdminReportsResponse | null
  filteredBoards: any[] // 필터링된 전체 게시글 목록 (클라이언트 사이드 페이지네이션용)
  setBoardData: (data: BoardPageData | null) => void
  setReportedBoardsData: (data: AdminReportsResponse | null) => void
  setReportedCommentsData: (data: AdminReportsResponse | null) => void
  setFilteredBoards: (boards: any[]) => void

  // 로딩 상태
  loading: boolean
  reportsLoading: boolean
  setLoading: (loading: boolean) => void
  setReportsLoading: (loading: boolean) => void

  // 게시글 수정 모달
  editModalState: {
    isOpen: boolean
    boardId: number | null
    initialData: {
      title: string
      content: string
      category: string
      anonymous: boolean
    } | null
  }
  setEditModalState: (state: {
    isOpen: boolean
    boardId: number | null
    initialData: {
      title: string
      content: string
      category: string
      anonymous: boolean
    } | null
  }) => void
  openEditModal: (boardId: number, initialData: {
    title: string
    content: string
    category: string
    anonymous: boolean
  }) => void
  closeEditModal: () => void

  // 초기화 함수
  reset: () => void
}

export const useManageBoardStore = create<ManageBoardState>((set, get) => ({
  // 탭 관리
  activeTab: 'posts',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // 데이터 상태
  boardData: null,
  reportedBoardsData: null,
  reportedCommentsData: null,
  filteredBoards: [],
  setBoardData: (data) => set({ boardData: data }),
  setReportedBoardsData: (data) => set({ reportedBoardsData: data }),
  setReportedCommentsData: (data) => set({ reportedCommentsData: data }),
  setFilteredBoards: (boards) => set({ filteredBoards: boards }),

  // 로딩 상태
  loading: false,
  reportsLoading: false,
  setLoading: (loading) => set({ loading }),
  setReportsLoading: (reportsLoading) => set({ reportsLoading }),

  // 게시글 수정 모달
  editModalState: {
    isOpen: false,
    boardId: null,
    initialData: null,
  },
  setEditModalState: (state) => set({ editModalState: state }),
  openEditModal: (boardId, initialData) => set({
    editModalState: {
      isOpen: true,
      boardId,
      initialData,
    }
  }),
  closeEditModal: () => set({
    editModalState: {
      isOpen: false,
      boardId: null,
      initialData: null,
    }
  }),

  // 초기화 함수
  reset: () => set({
    activeTab: 'posts',
    boardData: null,
    reportedBoardsData: null,
    reportedCommentsData: null,
    filteredBoards: [],
    loading: false,
    reportsLoading: false,
    editModalState: {
      isOpen: false,
      boardId: null,
      initialData: null,
    }
  })
}))
