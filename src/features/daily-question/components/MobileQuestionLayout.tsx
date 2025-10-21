import React from 'react'

import { QuestionCard as QuestionCardType } from '../types/questionCard'

import QuestionCard from './QuestionCard'

interface MobileQuestionLayoutProps {
  cards: QuestionCardType[]
  likedCards: Set<number>
  onLikeClick: (index: number) => void
}

const MobileQuestionLayout: React.FC<MobileQuestionLayoutProps> = ({
  cards,
  likedCards,
  onLikeClick,
}) => {
  return (
    <div className="space-y-6">
      {cards.map((card, index) => (
        <QuestionCard
          key={index}
          card={card}
          index={index}
          isLiked={likedCards.has(index)}
          onLikeClick={onLikeClick}
          isMobile={true}
        />
      ))}
    </div>
  )
}

export default MobileQuestionLayout
