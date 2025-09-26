import React from 'react'
import { QuestionCard as QuestionCardType } from '../types/questionCard'
import Like from '../assets/images/Like.svg'
import Liked from '../assets/images/Liked.svg'

interface QuestionCardProps {
  card: QuestionCardType
  index: number
  isLiked: boolean
  onLikeClick: (index: number) => void
  isMobile?: boolean
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  card,
  index,
  isLiked,
  onLikeClick,
  isMobile = false
}) => {
  const cardClasses = isMobile 
    ? "relative overflow-hidden mx-auto flex flex-col bg-cover bg-center transition-transform duration-200 hover:translate-y-[-2px] max-w-full rounded-xl p-4"
    : "relative overflow-hidden flex flex-col bg-cover bg-center transition-transform duration-200 hover:translate-y-[-2px] rounded-xl p-4 min-h-[140px] w-full min-w-[400px] max-w-[400px]"
  
  const textClasses = isMobile
    ? "text-center text-darkWalnut text-lg font-normal font-mainFont whitespace-pre-line"
    : "text-center text-darkWalnut text-xl lg:text-2xl font-normal font-mainFont whitespace-pre-line"
  
  const heartSize = isMobile ? "w-6 h-6" : "w-8 h-8"
  const heartPosition = "absolute bottom-1 right-1 z-20"

  return (
    <div 
      className={cardClasses}
      style={{ 
        backgroundImage: 'url("/images/ConcernBackground.png")',
        boxShadow: 'rgb(71, 60, 44) 0px 0px 0px 2px inset'
      }}
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className={textClasses}>
          {card.content}
        </div>
      </div>
      
      {/* 하트 좋아요 버튼 */}
      <div className={heartPosition}>
        <button
          onClick={() => onLikeClick(index)}
          className="p-2 rounded-full transition-colors duration-200"
        >
          <img
            src={isLiked ? Liked : Like}
            alt="좋아요"
            className={`${heartSize} cursor-pointer`}
          />
        </button>
      </div>
    </div>
  )
}

export default QuestionCard
