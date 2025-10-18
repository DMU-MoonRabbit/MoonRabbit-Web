import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

interface AdminPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export const AdminPagination: React.FC<AdminPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {

  const ICON_SIZE = 16
  const BUTTON_CLASSES = {
    base: 'px-4 py-2 rounded-lg',
    disabled: 'cursor-not-allowed opacity-50',
    enabled: 'cursor-pointer hover:bg-gray-100'
  }
  
  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage)
    }
  }

  // 페이지 상태 계산
  const isFirstPage = currentPage === 0
  const isLastPage = currentPage === totalPages - 1
  const displayPage = currentPage + 1

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={clsx("flex justify-center items-center mt-8 gap-2", className)}>
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={clsx(
          BUTTON_CLASSES.base,
          isFirstPage ? BUTTON_CLASSES.disabled : BUTTON_CLASSES.enabled
        )}
      >
        <ChevronLeft size={ICON_SIZE} className="text-darkWalnut" />
      </button>
      
      {/* 페이지 정보 */}
      <span className="mx-4 text-darkWalnut font-mainFont">
        {displayPage} / {totalPages}
      </span>
      
      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className={clsx(
          BUTTON_CLASSES.base,
          isLastPage ? BUTTON_CLASSES.disabled : BUTTON_CLASSES.enabled
        )}
      >
        <ChevronRight size={ICON_SIZE} className="text-darkWalnut" />
      </button>
    </div>
  )
}
