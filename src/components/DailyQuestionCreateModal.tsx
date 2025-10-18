import React, { useState } from 'react'
import { ENDPOINTS } from '../api/endpoints'
import axios from 'axios'
import { AdminModal } from './AdminModal'

interface DailyQuestionCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const DailyQuestionCreateModal: React.FC<DailyQuestionCreateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!date.trim()) {
      alert('날짜를 선택해주세요.')
      return
    }

    if (!content.trim()) {
      alert('질문 내용을 입력해주세요.')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      await axios.post(
        ENDPOINTS.ADMIN_DAILY_QUESTION_CREATE,
        {
          date: date,
          content: content.trim(),
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      alert('질문이 성공적으로 생성되었습니다.')
      setDate('')
      setContent('')
      onSuccess()
    } catch (error) {
      console.error('질문 생성 실패:', error)
      alert('질문 생성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setDate('')
      setContent('')
      onClose()
    }
  }

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={handleClose}
      title="오늘의질문 생성"
      disabled={loading}
    >
      {/* 날짜 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-mainFont text-darkWalnut mb-2">
            날짜 *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut"
            disabled={loading}
          />
        </div>

        {/* 질문 내용 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-mainFont text-darkWalnut mb-2">
            질문 내용 *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut resize-none"
            placeholder="질문 내용을 입력하세요"
            rows={4}
            maxLength={500}
            disabled={loading}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {content.length}/500
          </div>
        </div>

      {/* 버튼 영역 */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleClose}
          className="px-6 py-2 rounded-full font-mainFont text-darkWalnut bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-full font-mainFont text-white bg-mainColor hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          disabled={loading}
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {loading ? '생성 중...' : '생성하기'}
        </button>
      </div>
    </AdminModal>
  )
}

