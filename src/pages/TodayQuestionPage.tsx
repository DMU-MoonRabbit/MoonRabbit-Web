import React from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import { useQuestionCards } from '../hooks/useQuestionCards'
import StarBackground from '../components/StarBackground'
import PageHeader from '../components/PageHeader'
import MobileQuestionLayout from '../components/MobileQuestionLayout'
import DesktopQuestionLayout from '../components/DesktopQuestionLayout'

const TodayQuestionPage: React.FC = () => {
  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'
  
  const { 
    todayQuestion, 
    loading, 
    likedCards, 
    handleLikeClick, 
    questionCards 
  } = useQuestionCards()

  return (
    <div className="min-h-screen bg-lightBeige relative overflow-hidden">
      <StarBackground isMobile={isMobile} />

      <div className="container mx-auto px-4 py-8 lg:py-16">
        <PageHeader showSubtitle={false} />
        
        {/* 오늘의 질문 */}
        <div className="text-center mb-8 lg:mb-16">
          <div className="text-darkWalnut text-lg lg:text-2xl xl:text-3xl font-normal font-mainFont max-w-4xl mx-auto leading-relaxed">
            {loading ? "질문을 불러오는 중..." : (todayQuestion?.content || "자신만의 스트레스 해소법은 뭔가요?")}
          </div>
        </div>

        {/* 질문답변 카드 섹션 */}
        <div className="mb-8 relative z-10">
          {isMobile ? (
            <MobileQuestionLayout
              cards={questionCards}
              likedCards={likedCards}
              onLikeClick={handleLikeClick}
            />
          ) : (
            <DesktopQuestionLayout
              cards={questionCards}
              likedCards={likedCards}
              onLikeClick={handleLikeClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default TodayQuestionPage
