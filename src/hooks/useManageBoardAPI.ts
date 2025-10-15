import { useEffect } from 'react'
import { useManageBoardStore } from '../stores/useManageBoardStore'
import { usePaginationStore } from '../stores/usePaginationStore'
import ENDPOINTS from '../api/endpoints'
import axios from 'axios'

export const useManageBoardAPI = () => {
  const {
    activeTab,
    setBoardData,
    setReportedBoardsData,
    setReportedCommentsData,
    setLoading,
    setReportsLoading,
  } = useManageBoardStore()

  const {
    boardPostsPage,
    reportedBoardsPage,
    reportedCommentsPage,
  } = usePaginationStore()

  const pageSize = 9
  const reportsPageSize = 10

  // 게시글 목록 조회
  const fetchBoardPosts = async (page: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      
      const response = await axios.get(
        ENDPOINTS.CONCERN_LIST(page, pageSize),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      
      console.log('게시글 목록 API 응답:', response.data)
      setBoardData(response.data)
      setLoading(false)
      
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error)
      setBoardData(null)
      setLoading(false)
    }
  }

  // 신고된 게시글 목록 조회
  const fetchReportedBoards = async (page: number) => {
    setReportsLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const url = ENDPOINTS.REPORT_LIST_BY_TYPE('BOARD', page, reportsPageSize)
      
      console.log('신고된 게시글 목록 조회 URL:', url)
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      
      console.log('신고된 게시글 목록 API 응답:', response.data)
      setReportedBoardsData(response.data)
      setReportsLoading(false)
      
    } catch (error) {
      console.error('신고된 게시글 목록 조회 실패:', error)
      if (axios.isAxiosError(error)) {
        console.error('에러 응답:', error.response?.data)
        console.error('에러 상태:', error.response?.status)
      }
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
          unpaged: false
        },
        empty: true
      })
      setReportsLoading(false)
    }
  }

  // 신고된 댓글 목록 조회
  const fetchReportedComments = async (page: number) => {
    setReportsLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const url = ENDPOINTS.REPORT_LIST_BY_TYPE('ANSWER', page, reportsPageSize)
      
      console.log('신고된 댓글 목록 조회 URL:', url)
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      
      console.log('신고된 댓글 목록 API 응답:', response.data)
      setReportedCommentsData(response.data)
      setReportsLoading(false)
      
    } catch (error) {
      console.error('신고된 댓글 목록 조회 실패:', error)
      if (axios.isAxiosError(error)) {
        console.error('에러 응답:', error.response?.data)
        console.error('에러 상태:', error.response?.status)
      }
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
          unpaged: false
        },
        empty: true
      })
      setReportsLoading(false)
    }
  }

  // 게시글 수정
  const updateBoard = async (boardId: number, updateData: any) => {
    try {
      const token = localStorage.getItem('accessToken')
      
      await axios.put(
        ENDPOINTS.ADMIN_BOARD_UPDATE(boardId),
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      
      console.log('게시글 수정 성공:', updateData)
      return true
      
    } catch (error) {
      console.error('게시글 수정 실패:', error)
      throw error
    }
  }

  // 게시글 삭제
  const deleteBoard = async (boardId: number) => {
    try {
      const token = localStorage.getItem('accessToken')
      
      await axios.delete(
        ENDPOINTS.ADMIN_BOARD_DELETE(boardId),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      
      console.log('게시글 삭제 성공:', boardId)
      return true
      
    } catch (error) {
      console.error('게시글 삭제 실패:', error)
      throw error
    }
  }

  // 자동 데이터 로딩
  useEffect(() => {
    fetchBoardPosts(boardPostsPage)
  }, [boardPostsPage])

  useEffect(() => {
    if (activeTab === 'reportedBoards') {
      fetchReportedBoards(reportedBoardsPage)
    }
  }, [activeTab, reportedBoardsPage])

  useEffect(() => {
    if (activeTab === 'reportedComments') {
      fetchReportedComments(reportedCommentsPage)
    }
  }, [activeTab, reportedCommentsPage])

  // 신고 생성
  const createReport = async (reportData: {
    reportTargetType: 'BOARD' | 'ANSWER'
    targetId: number
    reason: string
  }) => {
    try {
      const token = localStorage.getItem('accessToken')
      
      await axios.post(
        ENDPOINTS.REPORT_CREATE,
        reportData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      
      console.log('신고 생성 성공:', reportData)
      return true
      
    } catch (error) {
      console.error('신고 생성 실패:', error)
      throw error
    }
  }

  return {
    fetchBoardPosts,
    fetchReportedBoards,
    fetchReportedComments,
    updateBoard,
    deleteBoard,
    createReport,
  }
}

