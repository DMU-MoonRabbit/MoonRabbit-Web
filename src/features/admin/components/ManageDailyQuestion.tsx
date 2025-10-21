import axios from 'axios'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import { ENDPOINTS } from '@/api/endpoints'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import { DailyQuestion } from '@/features/daily-question/types/question'

import { DailyQuestionCreateModal } from './DailyQuestionCreateModal'

export const ManageDailyQuestion = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const [question, setQuestion] = useState<DailyQuestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // 오늘의질문 조회
  const fetchDailyQuestion = async () => {
    setLoading(true)
    try {
      const response = await axios.get(ENDPOINTS.DAILY_QUESTION)
      setQuestion(response.data)
    } catch {
      alert('오늘의질문을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 오늘의질문 생성 성공 후 콜백
  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false)
    fetchDailyQuestion()
    setCurrentPage(0)
  }

  // 초기 데이터 로딩
  useEffect(() => {
    fetchDailyQuestion()
  }, [])

  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-sm',
        isMobile ? 'p-4' : 'p-6',
      )}
    >
      {/* 헤더 */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 rounded-full font-mainFont text-sm text-white bg-mainColor hover:bg-opacity-80 transition-colors"
        >
          질문 생성하기
        </button>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mainColor"></div>
        </div>
      )}

      {/* 오늘의 질문 */}
      {!loading && question && (
        <div className="mx-auto">
          {/* 날짜 배지 */}
          <div className="flex mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mainColor/10 rounded-full">
              <span className="text-sm font-mainFont font-semibold text-mainColor">
                {question.date}
              </span>
            </div>
          </div>
          {/* 질문 내용 */}
          <div className="bg-white rounded-xl p-6 shadow-inner border border-lightBeige">
            <p className="text-lg font-gothicFont text-darkWalnut leading-relaxed">
              {question.content}
            </p>
          </div>
        </div>
      )}

      {/* 질문이 없을 때 */}
      {!loading && !question && (
        <div className="mx-auto">
          <p className="text-lg font-mainFont text-gray-600">
            등록된 오늘의 질문이 없습니다
          </p>
          <p className="text-sm font-gothicFont text-gray-500 mt-2">
            질문을 생성해주세요
          </p>
        </div>
      )}

      {/* 질문 생성 모달 */}
      <DailyQuestionCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  )
}
