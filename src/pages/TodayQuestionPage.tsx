import React from 'react'

import PageHeader from '@/common/components/PageHeader'
import StarBackground from '@/common/components/StarBackground'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import DailyAnswerDisplay from '@/features/daily-question/components/DailyAnswerDisplay'
import DailyAnswerInput from '@/features/daily-question/components/DailyAnswerInput'
import DesktopQuestionLayout from '@/features/daily-question/components/DesktopQuestionLayout'
import MobileQuestionLayout from '@/features/daily-question/components/MobileQuestionLayout'
import { useQuestionCards } from '@/features/daily-question/hooks/useQuestionCards'

const TodayQuestionPage: React.FC = () => {
  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'

  const {
    todayQuestion,
    loading,
    likedCards,
    handleLikeClick,
    questionCards,
    submitAnswer,
    submitting,
    myAnswer,
    isEditing,
    startEditing,
  } = useQuestionCards()

  return (
    <div className="min-h-screen bg-lightBeige relative overflow-hidden">
      <StarBackground isMobile={isMobile} />

      <div className="container mx-auto px-4 py-8 lg:py-16">
        <PageHeader showSubtitle={false} />

        {/* 오늘의 질문 */}
        <div className="text-center mb-8 lg:mb-16">
          <div className="text-darkWalnut text-lg lg:text-2xl xl:text-3xl font-normal font-mainFont max-w-4xl mx-auto leading-relaxed">
            {loading
              ? '질문을 불러오는 중...'
              : todayQuestion?.content || '자신만의 스트레스 해소법은 뭔가요?'}
          </div>
        </div>

        {/* 내 답변 섹션 */}
        {!loading && (
          <div className="mb-8 lg:mb-16 relative z-10">
            {myAnswer && !isEditing ? (
              <DailyAnswerDisplay answer={myAnswer} onEdit={startEditing} />
            ) : (
              <DailyAnswerInput
                onSubmit={submitAnswer}
                submitting={submitting}
                existingAnswer={myAnswer?.answerContent || ''}
              />
            )}
          </div>
        )}

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
