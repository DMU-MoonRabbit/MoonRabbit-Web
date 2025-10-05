import React, { useEffect, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMypageStore } from '../stores/useMypageStore'
import CategoryBar from './CategoryBar'
import ConcernCard from './ConcernCard'

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

  useEffect(() => {
    fetchMyConcerns(pageInfo.number)
  }, [fetchMyConcerns, pageInfo.number])

  const handleCardClick = useCallback((id: number) => {
    navigate(`/night-sky/${id}`)
  }, [navigate])

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 0 && newPage < pageInfo.totalPages) {
      setPage(newPage)
    }
  }, [pageInfo.totalPages, setPage])

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
        {filteredConcerns.map((concern) => (
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

      {/* 페이징 UI */}
      {!pageInfo.empty && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(pageInfo.number - 1)}
            disabled={pageInfo.first}
            className={`px-4 py-2 rounded-lg ${
              pageInfo.first
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <ChevronLeft size={16} className="text-darkWalnut" />
          </button>
          <span className="mx-4 text-black">
            {pageInfo.number + 1} / {pageInfo.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pageInfo.number + 1)}
            disabled={pageInfo.last}
            className={`px-4 py-2 rounded-lg ${
              pageInfo.last
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
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
