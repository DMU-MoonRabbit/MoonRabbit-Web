import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import CategoryBar from '@/common/components/CategoryBar'
import ConcernCard from '@/features/concern-board/components/ConcernCard'

import { useMypageStore } from '../stores/useMypageStore'

interface MyBoardContentsProps {
  userId?: number
  isOwnPage?: boolean
}

const MyBoardContents: React.FC<MyBoardContentsProps> = memo(
  ({ userId, isOwnPage = true }) => {
    const {
      selectedCategory,
      filteredConcerns,
      pageInfo,
      otherUserFilteredConcerns,
      otherUserPageInfo,
      setSelectedCategory,
      fetchMyConcerns,
      fetchOtherUserConcerns,
      setPage,
      setOtherUserPage,
    } = useMypageStore()

    const navigate = useNavigate()

    // 현재 사용할 데이터와 함수들 결정
    const concerns = isOwnPage ? filteredConcerns : otherUserFilteredConcerns
    const currentPageInfo = isOwnPage ? pageInfo : otherUserPageInfo
    const setPageFunction = isOwnPage ? setPage : setOtherUserPage

    useEffect(() => {
      if (isOwnPage) {
        fetchMyConcerns(pageInfo.number)
      } else if (userId) {
        fetchOtherUserConcerns(userId, otherUserPageInfo.number)
      }
    }, [
      fetchMyConcerns,
      fetchOtherUserConcerns,
      pageInfo.number,
      otherUserPageInfo.number,
      userId,
      isOwnPage,
    ])

    const handleCardClick = useCallback(
      (id: number) => {
        navigate(`/night-sky/${id}`)
      },
      [navigate],
    )

    const handlePageChange = useCallback(
      (newPage: number) => {
        if (newPage >= 0 && newPage < currentPageInfo.totalPages) {
          setPageFunction(newPage)
        }
      },
      [currentPageInfo.totalPages, setPageFunction],
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

        {/* 페이징 UI */}
        {!currentPageInfo.empty && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPageInfo.number - 1)}
              disabled={currentPageInfo.first}
              className={`px-4 py-2 rounded-lg ${
                currentPageInfo.first
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:bg-gray-100'
              }`}
            >
              <ChevronLeft size={16} className="text-darkWalnut" />
            </button>
            <span className="mx-4 text-darkWalnut font-mainFont">
              {currentPageInfo.number + 1} / {currentPageInfo.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPageInfo.number + 1)}
              disabled={currentPageInfo.last}
              className={`px-4 py-2 rounded-lg ${
                currentPageInfo.last
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
  },
)

export default MyBoardContents
