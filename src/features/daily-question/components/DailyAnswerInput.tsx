import React, { useState } from 'react'

import MiniModal from '@/common/components/MiniModal'

import { DailyAnswerResponse } from '../types/question'

interface DailyAnswerInputProps {
  onSubmit: (answer: string) => Promise<DailyAnswerResponse | null>
  submitting: boolean
  existingAnswer?: string
}

export const DailyAnswerInput: React.FC<DailyAnswerInputProps> = ({
  onSubmit,
  submitting,
  existingAnswer = '',
}) => {
  const [answer, setAnswer] = useState(existingAnswer)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    message: string
  }>({
    isOpen: false,
    type: 'success',
    message: '',
  })

  const showModal = (type: 'success' | 'error', message: string) => {
    setModalState({ isOpen: true, type, message })
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      showModal('error', '로그인이 필요합니다.')
      return
    }

    // 토큰 만료 시간 확인
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = tokenData.exp * 1000
      if (Date.now() >= expirationTime) {
        localStorage.removeItem('accessToken')
        showModal('error', '로그인이 만료되었습니다. 다시 로그인해주세요.')
        return
      }
    } catch {
      localStorage.removeItem('accessToken')
      showModal('error', '유효하지 않은 토큰입니다. 다시 로그인해주세요.')
      return
    }

    const content = answer.trim()
    if (!content) {
      showModal('error', '답변을 입력해주세요.')
      return
    }

    const result = await onSubmit(content)
    if (result) {
      showModal(
        'success',
        existingAnswer ? '답변이 수정되었습니다!' : '답변이 제출되었습니다!',
      )
    } else {
      showModal('error', '답변 제출에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mb-8">
        <div className="border-2 border-darkWalnut p-4 rounded-xl bg-white">
          <textarea
            className="font-gothicFont appearance-none border-none outline-none resize-none bg-transparent p-0 m-0 shadow-none focus:ring-0 focus:outline-none w-full text-darkWalnut"
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="오늘의 질문에 대한 답변을 작성해보세요..."
            disabled={submitting}
          />
          <div className="flex justify-end mt-4">
            <button
              className={`font-gothicFont px-6 py-2 rounded-lg text-sm md:text-base shadow-md transition-all ${
                submitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-mainColor text-mainWhite hover:bg-opacity-90 cursor-pointer'
              }`}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? '제출 중...'
                : existingAnswer
                  ? '답변 수정'
                  : '답변 제출'}
            </button>
          </div>
        </div>
      </div>

      <MiniModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        message={modalState.message}
      />
    </>
  )
}

export default DailyAnswerInput
