import React, { useEffect } from 'react'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import { useManageBoardStore } from '../stores/useManageBoardStore'
import { usePaginationStore } from '@/common/hooks/usePaginationStore'
import { useAdminStore } from '../stores/useAdminStore'
import { useManageBoardAPI } from '@/features/concern-board/hooks/useManageBoardAPI'
import { ReportedBoard } from './ReportedBoard'
import { BoardPostsTable } from './BoardPostsTable'
import { BoardEditModal } from './BoardEditModal'
import { BoardPost } from '@/features/concern-board/types/board'
import clsx from 'clsx'
import { BoardUpdateRequest } from '../types/admin'

export const ManageBoard = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  
  const {
    activeTab,
    boardData,
    reportedBoardsData,
    reportedCommentsData,
    loading,
    reportsLoading,
    editModalState,
    filteredBoards,
    setActiveTab,
    openEditModal,
    closeEditModal,
    setBoardData,
    setFilteredBoards,
  } = useManageBoardStore()
  
  const {
    boardPostsPage,
    reportedBoardsPage,
    reportedCommentsPage,
    setBoardPostsPage,
    setReportedBoardsPage,
    setReportedCommentsPage,
  } = usePaginationStore()
  
  const { searchTerm, isSearching } = useAdminStore()
  
  const { fetchBoardPosts, searchBoardPosts, updateBoard, deleteBoard } = useManageBoardAPI()

  // 초기 데이터 로딩
  useEffect(() => {
    if (activeTab === 'posts' && !isSearching) {
      fetchBoardPosts(boardPostsPage)
    }
  }, [boardPostsPage, activeTab])

  // 검색 실행
  useEffect(() => {
    if (activeTab === 'posts') {
      if (isSearching && searchTerm.trim()) {
        searchBoardPosts(searchTerm)
        setBoardPostsPage(0)
      } else if (!isSearching && !searchTerm.trim()) {
        setFilteredBoards([])
        setBoardPostsPage(0)
        fetchBoardPosts(0)
      }
    }
  }, [isSearching, searchTerm, activeTab])

  const handlePostPageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (boardData?.totalPages || 0)) {
      setBoardPostsPage(newPage)
      
      // 검색 중일 때
      if (isSearching && searchTerm.trim() && filteredBoards.length > 0) {
        const pageSize = 9
        const start = newPage * pageSize
        const end = start + pageSize
        const totalElements = filteredBoards.length
        const totalPages = Math.ceil(totalElements / pageSize)
        
        setBoardData({
          ...boardData!,
          content: filteredBoards.slice(start, end) as BoardPost[],
          number: newPage,
          numberOfElements: Math.min(pageSize, totalElements - start),
          first: newPage === 0,
          last: newPage === totalPages - 1,
        })
      } else {
        fetchBoardPosts(newPage)
      }
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
  const handleOpenEditModal = (boardId: number, boardData: unknown) => {
    const data = boardData as { title: string; content: string; category: string }
    openEditModal(boardId, {
      title: data.title,
      content: data.content,
      category: data.category,
      anonymous: false, // 기본값
    })
  }

  // 게시글 수정
  const handleUpdateBoard = async (updateData: BoardUpdateRequest) => {
    if (!editModalState.boardId) return

    try {
      await updateBoard(editModalState.boardId, updateData)
      alert('게시글이 성공적으로 수정되었습니다.')
      
      // 현재 페이지 데이터 새로고침
      if (isSearching && searchTerm.trim()) {
        searchBoardPosts(searchTerm)
      } else {
        fetchBoardPosts(boardPostsPage)
      }
      closeEditModal()
      
    } catch {
      alert('게시글 수정에 실패했습니다.')
    }
  }

  // 게시글 삭제
  const handleDeleteBoard = async (boardId: number) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return
    }

    try {
      await deleteBoard(boardId)
      alert('게시글이 성공적으로 삭제되었습니다.')
      
      // 현재 페이지 데이터 새로고침
      if (isSearching && searchTerm.trim()) {
        searchBoardPosts(searchTerm)
      } else {
        fetchBoardPosts(boardPostsPage)
      }
      
    } catch {
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
          신고된 게시글
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
          신고된 댓글
        </button>
      </div>

      {/* 게시글 목록 탭 */}
      {activeTab === 'posts' && (
        <BoardPostsTable
          boardData={boardData}
          loading={loading}
          currentPage={boardPostsPage}
          onPageChange={handlePostPageChange}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteBoard}
        />
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
