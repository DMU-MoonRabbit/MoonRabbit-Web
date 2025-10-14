import React from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

// 신고된 게시글/댓글 공통 타입
interface ReportedItem {
  id: number
  reportedId: number
  content: string
  reason: string
  reporterId: number
  reporterName: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  reportedAt: string
}

// 신고된 게시글 타입 (제목 포함)
interface ReportedBoardItem extends ReportedItem {
  title?: string
}

interface ReportedBoardProps {
  items: ReportedBoardItem[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  type: 'board' | 'comment'
}

export const ReportedBoard: React.FC<ReportedBoardProps> = ({
  items,
  currentPage,
  totalPages,
  onPageChange,
  type
}) => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  const pageSize = 10

  // 페이지네이션 처리
  const getPaginatedItems = (page: number) => {
    const startIndex = page * pageSize
    return items.slice(startIndex, startIndex + pageSize)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '대기중'
      case 'APPROVED':
        return '승인됨'
      case 'REJECTED':
        return '거부됨'
      default:
        return status
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage)
    }
  }

  const isBoard = type === 'board'
  const typeLabel = isBoard ? '게시글' : '댓글'
  const idLabel = isBoard ? '신고된 게시글 ID' : '신고된 댓글 ID'

  return (
    <>
      {/* 총 건수 */}
      <div className="mb-4">
        <span className={clsx("text-gray-600", isMobile ? "text-sm" : "text-base")}>
          전체 {items.length}건
        </span>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">{idLabel}</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">내용</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">신고 이유</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">신고자</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">신고일</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedItems(currentPage).map((item, index) => (
              <tr 
                key={item.id} 
                className={clsx(
                  "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                )}
              >
                <td className="py-3 px-4 text-gray-800 font-medium">{item.id}</td>
                <td className="py-3 px-4 text-gray-700">{item.reportedId}</td>
                <td className="py-3 px-4">
                  <div className="max-w-xs truncate" title={item.content}>
                    {item.content}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{item.reason}</td>
                <td className="py-3 px-4 text-gray-700">{item.reporterName}</td>
                <td className="py-3 px-4 text-gray-600">{item.reportedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 0
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={16} className="text-darkWalnut" />
          </button>
          <span className="mx-4 text-darkWalnut font-mainFont">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages - 1
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-gray-100'
            }`}
          >
            <ChevronRight size={16} className="text-darkWalnut" />
          </button>
        </div>
      )}
    </>
  )
}
