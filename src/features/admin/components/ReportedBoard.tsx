import clsx from 'clsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'

import { Report } from '../types/admin'

import { AdminPagination } from './AdminPagination'

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
  type,
}) => {
  const navigate = useNavigate()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const isBoard = type === 'board'
  const idLabel = isBoard ? '게시글 ID' : '댓글 ID'

  return (
    <>
      {/* 총 건수 */}
      <div className="mb-4">
        <span
          className={clsx('text-gray-600', isMobile ? 'text-sm' : 'text-base')}
        >
          전체 {items.length}건
        </span>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                ID
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                {idLabel}
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                내용
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                신고 이유
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                신고자 ID
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={clsx(
                  'border-b border-gray-100 hover:bg-gray-50 transition-colors',
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25',
                )}
              >
                <td className="py-3 px-4 text-gray-800 font-medium">
                  {item.id}
                </td>
                <td className="py-3 px-4 text-gray-700">{item.targetId}</td>
                <td className="py-3 px-4">
                  <div
                    className={clsx(
                      'max-w-xs truncate',
                      isBoard &&
                        'cursor-pointer hover:text-mainColor transition-colors',
                    )}
                    title={item.targetContent}
                    onClick={() =>
                      isBoard && navigate(`/night-sky/${item.targetId}`)
                    }
                  >
                    {item.targetContent}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{item.reason}</td>
                <td className="py-3 px-4 text-gray-700">{item.reporterId}</td>
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
