import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import { AdminPagination } from './AdminPagination'
import clsx from 'clsx'
import { BoardPageData } from '@/features/concern-board/types/board'

interface BoardPostsTableProps {
  boardData: BoardPageData | null
  loading: boolean
  currentPage: number
  onPageChange: (page: number) => void
  onEdit: (boardId: number, boardData: any) => void
  onDelete: (boardId: number) => void
}

export const BoardPostsTable: React.FC<BoardPostsTableProps> = ({
  boardData,
  loading,
  currentPage,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  return (
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
                    <div 
                      className="max-w-xs truncate cursor-pointer hover:text-mainColor transition-colors" 
                      title={post.title}
                      onClick={() => navigate(`/night-sky/${post.boardId}`)}
                    >
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
                        onClick={() => onEdit(post.boardId, post)}
                        className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => onDelete(post.boardId)}
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
      {!loading && boardData && (
        <AdminPagination
          currentPage={currentPage}
          totalPages={boardData.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  )
}

