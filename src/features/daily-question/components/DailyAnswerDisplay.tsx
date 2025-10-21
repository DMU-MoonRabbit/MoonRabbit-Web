import React from 'react'
import { DailyAnswerResponse } from '../types/question'

interface DailyAnswerDisplayProps {
  answer: DailyAnswerResponse
  onEdit: () => void
}

export const DailyAnswerDisplay: React.FC<DailyAnswerDisplayProps> = ({
  answer,
  onEdit
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="border-2 border-mainColor p-6 rounded-xl bg-white shadow-md">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-mainFont text-darkWalnut text-lg md:text-xl font-semibold">
            내 답변
          </h3>
          <button
            onClick={onEdit}
            className="font-gothicFont text-sm md:text-base text-mainColor hover:text-opacity-80 transition-all"
          >
            수정하기
          </button>
        </div>
        
        <div className="font-gothicFont text-darkWalnut text-base md:text-lg leading-relaxed mb-4 whitespace-pre-wrap">
          {answer.answerContent}
        </div>
        
        <div className="font-gothicFont text-gray-500 text-sm">
          {formatDate(answer.answeredAt)}
        </div>
      </div>
    </div>
  )
}

export default DailyAnswerDisplay

