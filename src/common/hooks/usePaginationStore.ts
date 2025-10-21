import { create } from 'zustand'

interface PaginationState {
  // 게시글 목록 페이지
  boardPostsPage: number
  setBoardPostsPage: (page: number) => void

  // 신고된 게시글 페이지
  reportedBoardsPage: number
  setReportedBoardsPage: (page: number) => void

  // 신고된 댓글 페이지
  reportedCommentsPage: number
  setReportedCommentsPage: (page: number) => void

  // 회원 목록 페이지
  usersPage: number
  setUsersPage: (page: number) => void

  // 모든 페이지 초기화
  resetAllPages: () => void

  // 특정 섹션 페이지 초기화
  resetBoardPages: () => void
  resetReportPages: () => void
}

export const usePaginationStore = create<PaginationState>((set) => ({
  // 게시글 목록 페이지
  boardPostsPage: 0,
  setBoardPostsPage: (page) => set({ boardPostsPage: page }),

  // 신고된 게시글 페이지
  reportedBoardsPage: 0,
  setReportedBoardsPage: (page) => set({ reportedBoardsPage: page }),

  // 신고된 댓글 페이지
  reportedCommentsPage: 0,
  setReportedCommentsPage: (page) => set({ reportedCommentsPage: page }),

  // 회원 목록 페이지
  usersPage: 0,
  setUsersPage: (page) => set({ usersPage: page }),

  // 모든 페이지 초기화
  resetAllPages: () =>
    set({
      boardPostsPage: 0,
      reportedBoardsPage: 0,
      reportedCommentsPage: 0,
      usersPage: 0,
    }),

  // 특정 섹션 페이지 초기화
  resetBoardPages: () =>
    set({
      boardPostsPage: 0,
      reportedBoardsPage: 0,
      reportedCommentsPage: 0,
    }),

  resetReportPages: () =>
    set({
      reportedBoardsPage: 0,
      reportedCommentsPage: 0,
    }),
}))
