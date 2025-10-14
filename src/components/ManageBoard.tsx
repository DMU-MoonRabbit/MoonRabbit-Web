import React, { useState, useEffect } from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ReportedBoard } from './ReportedBoard'
import { BoardEditModal } from './BoardEditModal'
import ENDPOINTS from '../api/endpoints'
import axios from 'axios'
import clsx from 'clsx'
import { BoardPageData } from '../types/board'
import { AdminReportsResponse, BoardUpdateRequest } from '../types/admin'

export const ManageBoard = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  
  const [activeTab, setActiveTab] = useState<'posts' | 'reportedBoards' | 'reportedComments'>('posts')
  const [currentPage, setCurrentPage] = useState(0)
  const [reportedBoardsPage, setReportedBoardsPage] = useState(0)
  const [reportedCommentsPage, setReportedCommentsPage] = useState(0)
  
  const [boardData, setBoardData] = useState<BoardPageData | null>(null)
  const [reportedBoardsData, setReportedBoardsData] = useState<AdminReportsResponse | null>(null)
  const [reportedCommentsData, setReportedCommentsData] = useState<AdminReportsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [reportsLoading, setReportsLoading] = useState(false)
  
  // 게시글 수정 모달 상태
  const [editModalState, setEditModalState] = useState<{
    isOpen: boolean
    boardId: number | null
    initialData: {
      title: string
      content: string
      category: string
      anonymous: boolean
    } | null
  }>({
    isOpen: false,
    boardId: null,
    initialData: null,
  })
  
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
      
      const response = await axios.get(
        ENDPOINTS.ADMIN_REPORTS_LIST('BOARD', page, reportsPageSize),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      
      console.log('신고된 게시글 목록 API 응답:', response.data)
      setReportedBoardsData(response.data)
      setReportsLoading(false)
      
    } catch (error) {
      console.error('신고된 게시글 목록 조회 실패:', error)
      setReportedBoardsData(null)
      setReportsLoading(false)
    }
  }

  // 신고된 댓글 목록 조회
  const fetchReportedComments = async (page: number) => {
    setReportsLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      
      const response = await axios.get(
        ENDPOINTS.ADMIN_REPORTS_LIST('ANSWER', page, reportsPageSize),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      
      console.log('신고된 댓글 목록 API 응답:', response.data)
      setReportedCommentsData(response.data)
      setReportsLoading(false)
      
    } catch (error) {
      console.error('신고된 댓글 목록 조회 실패:', error)
      setReportedCommentsData(null)
      setReportsLoading(false)
    }
  }

  useEffect(() => {
    fetchBoardPosts(currentPage)
  }, [currentPage])

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

  const handlePostPageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (boardData?.totalPages || 0)) {
      setCurrentPage(newPage)
    }
  }

  const handleReportedBoardsPageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (reportedBoardsData?.totalPages || 0)) {
      setReportedBoardsPage(newPage)
    }
  }

  const handleReportedCommentsPageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (reportedCommentsData?.totalPages || 0)) {
      setReportedCommentsPage(newPage)
    }
  }

  // 게시글 수정 모달 열기
  const openEditModal = (boardId: number, boardData: any) => {
    setEditModalState({
      isOpen: true,
      boardId,
      initialData: {
        title: boardData.title,
        content: boardData.content,
        category: boardData.category,
        anonymous: false, // 기본값
      },
    })
  }

  // 게시글 수정 모달 닫기
  const closeEditModal = () => {
    setEditModalState({
      isOpen: false,
      boardId: null,
      initialData: null,
    })
  }

  // 게시글 수정
  const handleUpdateBoard = async (updateData: BoardUpdateRequest) => {
    if (!editModalState.boardId) return

    try {
      const token = localStorage.getItem('accessToken')
      
      await axios.put(
        ENDPOINTS.ADMIN_BOARD_UPDATE(editModalState.boardId),
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
      alert('게시글이 성공적으로 수정되었습니다.')
      
      // 현재 페이지 데이터 새로고침
      fetchBoardPosts(currentPage)
      closeEditModal()
      
    } catch (error) {
      console.error('게시글 수정 실패:', error)
      alert('게시글 수정에 실패했습니다.')
    }
  }

  // 게시글 삭제
  const handleDeleteBoard = async (boardId: number) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return
    }

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
      alert('게시글이 성공적으로 삭제되었습니다.')
      
      // 현재 페이지 데이터 새로고침
      fetchBoardPosts(currentPage)
      
    } catch (error) {
      console.error('게시글 삭제 실패:', error)
      alert('게시글 삭제에 실패했습니다.')
    }
  }

  return (
    <div className={clsx("bg-white rounded-lg shadow-sm", isMobile ? "p-4" : "p-6")}>
      {/* 탭 헤더 */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('posts')}
          className={clsx(
            "px-6 py-3 font-mainFont transition-colors",
            activeTab === 'posts'
              ? "border-b-2 border-mainColor text-mainColor font-bold"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          게시글 목록
        </button>
        <button
          onClick={() => setActiveTab('reportedBoards')}
          className={clsx(
            "px-6 py-3 font-mainFont transition-colors",
            activeTab === 'reportedBoards'
              ? "border-b-2 border-mainColor text-mainColor font-bold"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          신고된 게시글 ({reportedBoardsData?.totalElements || 0})
        </button>
        <button
          onClick={() => setActiveTab('reportedComments')}
          className={clsx(
            "px-6 py-3 font-mainFont transition-colors",
            activeTab === 'reportedComments'
              ? "border-b-2 border-mainColor text-mainColor font-bold"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          신고된 댓글 ({reportedCommentsData?.totalElements || 0})
        </button>
      </div>

      {/* 게시글 목록 탭 */}
      {activeTab === 'posts' && (
        <>
          {/* 로딩 */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
            </div>
          )}

          {/* 총 건수 */}
          {!loading && boardData && (
            <div className="mb-4">
              <span className={clsx("text-gray-600", isMobile ? "text-sm" : "text-base")}>
                전체 {boardData.totalElements}건
              </span>
            </div>
          )}

          {/* 게시글 테이블 */}
          {!loading && boardData && !boardData.empty && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">제목</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">작성자</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">카테고리</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">댓글 수</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">좋아요</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {boardData.content.map((post, index) => (
                    <tr 
                      key={post.boardId} 
                      className={clsx(
                        "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      )}
                    >
                      <td className="py-3 px-4 text-gray-800 font-medium">{post.boardId}</td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs truncate" title={post.title}>
                          {post.title}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{post.nickname}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{post.answers.length}</td>
                      <td className="py-3 px-4 text-gray-600">{post.likeCount}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditModal(post.boardId, post)}
                            className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                          >
                            수정
                          </button>
                          <button 
                            onClick={() => handleDeleteBoard(post.boardId)}
                            className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 빈 데이터 */}
          {!loading && boardData && boardData.empty && (
            <div className="text-center py-8 text-gray-500">
              게시글이 없습니다.
            </div>
          )}

          {/* 페이지네이션 */}
          {!loading && boardData && boardData.totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => handlePostPageChange(currentPage - 1)}
                disabled={boardData.first}
                className={`px-4 py-2 rounded-lg ${
                  boardData.first
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} className="text-darkWalnut" />
              </button>
              <span className="mx-4 text-darkWalnut font-mainFont">
                {boardData.number + 1} / {boardData.totalPages}
              </span>
              <button
                onClick={() => handlePostPageChange(currentPage + 1)}
                disabled={boardData.last}
                className={`px-4 py-2 rounded-lg ${
                  boardData.last
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:bg-gray-100'
                }`}
              >
                <ChevronRight size={16} className="text-darkWalnut" />
              </button>
            </div>
          )}
        </>
      )}

      {/* 신고된 게시글 목록 탭 */}
      {activeTab === 'reportedBoards' && (
        <>
          {/* 로딩 */}
          {reportsLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
            </div>
          )}

          {/* 신고된 게시글 목록 */}
          {!reportsLoading && reportedBoardsData && (
            <ReportedBoard
              items={reportedBoardsData.content}
              currentPage={reportedBoardsPage}
              totalPages={reportedBoardsData.totalPages}
              onPageChange={handleReportedBoardsPageChange}
              type="board"
            />
          )}

          {/* 빈 데이터 */}
          {!reportsLoading && reportedBoardsData && reportedBoardsData.empty && (
            <div className="text-center py-8 text-gray-500">
              신고된 게시글이 없습니다.
            </div>
          )}
        </>
      )}

      {/* 신고된 댓글 목록 탭 */}
      {activeTab === 'reportedComments' && (
        <>
          {/* 로딩 */}
          {reportsLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
            </div>
          )}

          {/* 신고된 댓글 목록 */}
          {!reportsLoading && reportedCommentsData && (
            <ReportedBoard
              items={reportedCommentsData.content}
              currentPage={reportedCommentsPage}
              totalPages={reportedCommentsData.totalPages}
              onPageChange={handleReportedCommentsPageChange}
              type="comment"
            />
          )}

          {/* 빈 데이터 */}
          {!reportsLoading && reportedCommentsData && reportedCommentsData.empty && (
            <div className="text-center py-8 text-gray-500">
              신고된 댓글이 없습니다.
            </div>
          )}
        </>
      )}

      {/* 게시글 수정 모달 */}
      <BoardEditModal
        isOpen={editModalState.isOpen}
        onClose={closeEditModal}
        onSave={handleUpdateBoard}
        initialData={editModalState.initialData || undefined}
        boardId={editModalState.boardId || 0}
      />
    </div>
  )
}
