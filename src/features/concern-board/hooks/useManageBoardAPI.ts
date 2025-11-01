import { useCallback, useEffect } from 'react'

import axios from '@/api/axios'
import ENDPOINTS from '@/api/endpoints'
import { usePaginationStore } from '@/common/hooks/usePaginationStore'
import { useManageBoardStore } from '@/features/admin/stores/useManageBoardStore'

export const useManageBoardAPI = () => {
  const {
    activeTab,
    setBoardData,
    setReportedBoardsData,
    setReportedCommentsData,
    setLoading,
    setReportsLoading,
    setFilteredBoards,
  } = useManageBoardStore()

  const { boardPostsPage, reportedBoardsPage, reportedCommentsPage } =
    usePaginationStore()

  const pageSize = 9
  const reportsPageSize = 10

  // 게시글 목록 조회
  const fetchBoardPosts = useCallback(async (page: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')

      const response = await axios.get(ENDPOINTS.CONCERN_LIST(page, pageSize), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      setBoardData(response.data)
      setLoading(false)
    } catch {
      setBoardData(null)
      setLoading(false)
    }
  }, [setLoading, setBoardData, pageSize])

  // 게시글 검색 (클라이언트 사이드 필터링)
  const searchBoardPosts = useCallback(async (title: string) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')

      // 전체 데이터 가져오기 (큰 size로)
      const response = await axios.get(ENDPOINTS.CONCERN_LIST(0, 1000), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      // 제목으로 필터링
      const filteredContent = response.data.content.filter(
        (board: { title: string }) =>
          board.title.toLowerCase().includes(title.toLowerCase()),
      )

      // 필터링된 전체 데이터 저장
      setFilteredBoards(filteredContent)

      // 페이지네이션 정보 재계산
      const totalElements = filteredContent.length
      const totalPages = Math.ceil(totalElements / pageSize)

      setBoardData({
        ...response.data,
        content: filteredContent.slice(0, pageSize),
        totalElements,
        totalPages,
        numberOfElements: Math.min(pageSize, totalElements),
        number: 0,
        first: true,
        last: totalPages <= 1,
        empty: filteredContent.length === 0,
      })
      setLoading(false)
    } catch {
      setFilteredBoards([])
      setBoardData(null)
      setLoading(false)
    }
  }, [setLoading, setBoardData, setFilteredBoards, pageSize])

  // 신고된 게시글 목록 조회
  const fetchReportedBoards = useCallback(async (page: number) => {
    setReportsLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const url = ENDPOINTS.REPORT_LIST_BY_TYPE('BOARD', page, reportsPageSize)

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      setReportedBoardsData(response.data)
      setReportsLoading(false)
    } catch {
      // 빈 데이터로 설정
      setReportedBoardsData({
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
        size: reportsPageSize,
        content: [],
        number: page,
        sort: [],
        numberOfElements: 0,
        pageable: {
          offset: page * reportsPageSize,
          sort: [],
          pageNumber: page,
          pageSize: reportsPageSize,
          paged: true,
          unpaged: false,
        },
        empty: true,
      })
      setReportsLoading(false)
    }
  }, [setReportsLoading, setReportedBoardsData, reportsPageSize])

  // 신고된 댓글 목록 조회
  const fetchReportedComments = useCallback(async (page: number) => {
    setReportsLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const url = ENDPOINTS.REPORT_LIST_BY_TYPE('ANSWER', page, reportsPageSize)

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      setReportedCommentsData(response.data)
      setReportsLoading(false)
    } catch {
      // 빈 데이터로 설정
      setReportedCommentsData({
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
        size: reportsPageSize,
        content: [],
        number: page,
        sort: [],
        numberOfElements: 0,
        pageable: {
          offset: page * reportsPageSize,
          sort: [],
          pageNumber: page,
          pageSize: reportsPageSize,
          paged: true,
          unpaged: false,
        },
        empty: true,
      })
      setReportsLoading(false)
    }
  }, [setReportsLoading, setReportedCommentsData, reportsPageSize])

  // 게시글 수정
  const updateBoard = useCallback(async (boardId: number, updateData: unknown) => {
    const token = localStorage.getItem('accessToken')

    await axios.put(ENDPOINTS.ADMIN_BOARD_UPDATE(boardId), updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    return true
  }, [])

  // 게시글 삭제
  const deleteBoard = useCallback(async (boardId: number) => {
    const token = localStorage.getItem('accessToken')

    await axios.delete(ENDPOINTS.ADMIN_BOARD_DELETE(boardId), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    return true
  }, [])

  // 신고 생성
  const createReport = useCallback(async (reportData: {
    reportTargetType: 'BOARD' | 'ANSWER'
    targetId: number
    reason: string
  }) => {
    const token = localStorage.getItem('accessToken')

    await axios.post(ENDPOINTS.REPORT_CREATE, reportData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    return true
  }, [])

  // 신고된 게시글 자동 로딩
  useEffect(() => {
    if (activeTab === 'reportedBoards') {
      fetchReportedBoards(reportedBoardsPage)
    }
  }, [activeTab, reportedBoardsPage, fetchReportedBoards])

  // 신고된 댓글 자동 로딩
  useEffect(() => {
    if (activeTab === 'reportedComments') {
      fetchReportedComments(reportedCommentsPage)
    }
  }, [activeTab, reportedCommentsPage, fetchReportedComments])

  return {
    fetchBoardPosts,
    searchBoardPosts,
    fetchReportedBoards,
    fetchReportedComments,
    updateBoard,
    deleteBoard,
    createReport,
  }
}
