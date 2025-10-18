import React, { useEffect, useState } from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import { DailyQuestion } from '../types/question'
import { ENDPOINTS } from '../api/endpoints'
import axios from 'axios'
import clsx from 'clsx'
import { DailyQuestionCreateModal } from '../components/DailyQuestionCreateModal'

interface DailyQuestionResponse {
  content: DailyQuestion[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  first: boolean
  last: boolean
  empty: boolean
}

export const ManageDailyQuestion = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  
  const [questions, setQuestions] = useState<DailyQuestionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // 오늘의질문 목록 조회
  const fetchDailyQuestions = async (page = 0) => {
    setLoading(true)
    try {
      const response = await axios.get(ENDPOINTS.DAILY_QUESTION, )
      setQuestions(response.data)
    } catch (error) {
      console.error('오늘의질문 조회 실패:', error)
      alert('오늘의질문을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 오늘의질문 생성 성공 후 콜백
  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false)
    fetchDailyQuestions(0)
    setCurrentPage(0)
  }

  // 초기 데이터 로딩
  useEffect(() => {
    fetchDailyQuestions(currentPage)
  }, [])

  return (
    <div className={clsx("bg-white rounded-lg shadow-sm", isMobile ? "p-4" : "p-6")}>
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

      {/* 질문 목록 */} 
      {!loading && questions && (
        <div className="overflow-x-auto">
          <div className="w-full border-collapse">
            <div className="px-4 py-3 text-left text-sm font-mainFont font-semibold text-gray-700">
              {questions.content.map((question) => (
                <div key={question.id}>
                  {question.content}
                </div>
              ))}
            </div>
          </div>
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
