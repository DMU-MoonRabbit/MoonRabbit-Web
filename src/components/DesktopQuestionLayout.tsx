import React from 'react'
import { QuestionCard as QuestionCardType } from '../types/questionCard'
import QuestionCard from './QuestionCard'

interface DesktopQuestionLayoutProps {
  cards: QuestionCardType[]
  likedCards: Set<number>
  onLikeClick: (index: number) => void
}

const DesktopQuestionLayout: React.FC<DesktopQuestionLayoutProps> = ({
  cards,
  likedCards,
  onLikeClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
      {cards.map((card, index) => (
        <QuestionCard
          key={index}
          card={card}
          index={index}
          isLiked={likedCards.has(index)}
          onLikeClick={onLikeClick}
          isMobile={false}
        />
      ))}
    </div>
  )
}

export default DesktopQuestionLayout
