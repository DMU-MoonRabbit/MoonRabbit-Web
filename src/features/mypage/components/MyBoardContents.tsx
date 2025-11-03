import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import CategoryBar from '@/common/components/CategoryBar'
import ConcernCard from '@/features/concern-board/components/ConcernCard'

import { useMypageStore } from '../stores/useMypageStore'

const MyBoardContents: React.FC = memo(() => {
  const {
    selectedCategory,
    filteredConcerns,
    pageInfo,
    setSelectedCategory,
    fetchMyConcerns,
    setPage,
  } = useMypageStore()

  const navigate = useNavigate()

  // 페이지당 2개씩 표시 (현재 페이지에 해당하는 데이터만)
  const pageSize = 2
  const startIndex = pageInfo.number * pageSize
  const endIndex = startIndex + pageSize
  const concerns = filteredConcerns.slice(startIndex, endIndex)

  useEffect(() => {
    // 페이징 없이 모든 데이터를 한 번에 가져옴
    fetchMyConcerns(0)
  }, [fetchMyConcerns])

  const handleCardClick = useCallback(
    (id: number) => {
      navigate(`/night-sky/${id}`)
    },
    [navigate],
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 0 && newPage < pageInfo.totalPages) {
        setPage(newPage)
      }
    },
    [pageInfo.totalPages, setPage],
  )

  return (
    <>
      {/* 카테고리 바 */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        disableCentering={true}
      />

      {/* 고민 카드 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {concerns.map((concern) => (
          <ConcernCard
            key={concern.id}
            id={concern.id}
            profileImage={concern.profileImage}
            title={concern.title}
            content={concern.content}
            category={concern.category}
            recentComment={concern.recentComment}
            date={concern.date}
            backgroundImage={concern.backgroundImage}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {/* 페이징 UI - 2개 이상일 때만 표시 */}
      {!pageInfo.empty && pageInfo.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(pageInfo.number - 1)}
            disabled={pageInfo.first}
            className={`px-4 py-2 rounded-lg ${
              pageInfo.first
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={16} className="text-darkWalnut" />
          </button>
          <span className="mx-4 text-darkWalnut font-mainFont">
            {pageInfo.number + 1} / {pageInfo.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pageInfo.number + 1)}
            disabled={pageInfo.last}
            className={`px-4 py-2 rounded-lg ${
              pageInfo.last
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
})

export default MyBoardContents
