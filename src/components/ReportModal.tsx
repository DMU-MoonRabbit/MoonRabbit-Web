import React, { useState } from 'react'
import { ReportCreateRequest } from '../types/report'
import MiniModal from './MiniModal'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reportData: ReportCreateRequest) => Promise<void>
  targetType: 'BOARD' | 'ANSWER'
  targetId: number
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  targetType,
  targetId
}) => {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    message: string
  }>({
    isOpen: false,
    type: 'success',
    message: ''
  })

  const showModal = (type: 'success' | 'error', message: string) => {
    setModalState({ isOpen: true, type, message })
  }

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  const handleSubmit = async () => {
    if (!reason.trim()) {
      showModal('error', '신고 사유를 입력해주세요.')
      return
    }

    setSubmitting(true)
    try {
      const reportData: ReportCreateRequest = {
        targetType,
        targetId,
        reason: reason.trim()
      }
      
      await onSubmit(reportData)
      showModal('success', '신고가 접수되었습니다.')
      setReason('')
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      if (error instanceof Error && error.message.includes('로그인')) {
        showModal('error', '로그인 후 신고할 수 있습니다.')
      } else {
        showModal('error', '신고 접수에 실패했습니다.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setReason('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={handleClose}></div>
        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-4 w-full">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          {/* 제목 */}
          <h3 className="text-xl font-mainFont text-darkWalnut text-center mb-4">
            신고하기
          </h3>

          {/* 신고 사유 입력 */}
          <div className="mb-6">
            <label className="block text-sm font-gothicFont text-gray-700 mb-2">
              신고 사유
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="신고 사유를 입력해주세요..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-mainColor"
              rows={4}
              disabled={submitting}
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleClose}
              className="px-6 py-2 rounded-full font-mainFont text-darkWalnut bg-gray-200 hover:bg-gray-300 transition-colors"
              disabled={submitting}
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 rounded-full font-mainFont text-white transition-colors ${
                submitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
              disabled={submitting}
            >
              {submitting ? '신고 중...' : '신고하기'}
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

export default ReportModal
