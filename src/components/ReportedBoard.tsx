import React from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import { AdminPagination } from './AdminPagination'
import { Report } from '../types/admin'
import clsx from 'clsx'

interface ReportedBoardProps {
  items: Report[]
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

  const isBoard = type === 'board'
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">신고자 ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">상태</th>
                </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr 
                key={item.id} 
                className={clsx(
                  "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                )}
              >
                <td className="py-3 px-4 text-gray-800 font-medium">{item.id}</td>
                <td className="py-3 px-4 text-gray-700">{item.targetId}</td>
                <td className="py-3 px-4">
                  <div className="max-w-xs truncate" title={item.targetContent}>
                    {item.targetContent}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{item.reason}</td>
                <td className="py-3 px-4 text-gray-700">{item.reporterId}</td>
                <td className="py-3 px-4">
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    item.status === 'PENDING' && "bg-yellow-100 text-yellow-800",
                    item.status === 'APPROVED' && "bg-green-100 text-green-800",
                    item.status === 'REJECTED' && "bg-red-100 text-red-800"
                  )}>
                    {item.status === 'PENDING' ? '대기' : item.status === 'APPROVED' ? '승인' : '거부'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  )
}
