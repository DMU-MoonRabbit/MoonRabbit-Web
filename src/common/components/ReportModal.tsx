import axios from 'axios'
import React, { useState } from 'react'

import { ENDPOINTS } from '@/api/endpoints'
import { ReportCreateRequest } from '@/features/admin/types/report'

import MiniModal from './MiniModal'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  targetType: 'BOARD' | 'ANSWER'
  targetId: number
  onSuccess?: () => void
}

// 일반적인 신고 사유 옵션
const REPORT_REASONS = [
  '부적절한 언어 사용',
  '혐오 표현 또는 차별적 발언',
  '스팸 또는 광고',
  '개인정보 유출',
  '저작권 침해',
  '기타',
] as const

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  onSuccess,
}) => {
  const [reason, setReason] = useState('')
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [customReason, setCustomReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
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
    // 사유 선택 또는 직접 입력 검증
    const finalReason = selectedReason === '기타' ? customReason.trim() : selectedReason || reason.trim()

    if (!finalReason) {
      showModal('error', '신고 사유를 입력해주세요.')
      return
    }

    const token = localStorage.getItem('accessToken')
    if (!token) {
      showModal('error', '로그인 후 신고할 수 있습니다.')
      return
    }

    setSubmitting(true)
    try {
      const reportData: ReportCreateRequest = {
        targetType,
        targetId,
        reason: finalReason,
      }

      await axios.post(ENDPOINTS.REPORT_CREATE, reportData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      showModal('success', '신고가 접수되었습니다.')
      setReason('')
      setSelectedReason('')
      setCustomReason('')
      
      if (onSuccess) {
        onSuccess()
      }

      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      // 에러 유형별 세부 메시지 처리
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const message =
          error.response?.data?.message || error.response?.data?.error

        if (status === 400) {
          showModal(
            'error',
            message || '잘못된 신고 요청입니다. 신고 사유를 확인해주세요.',
          )
        } else if (status === 401 || status === 403) {
          showModal('error', '로그인이 필요하거나 권한이 없습니다.')
        } else if (status === 404) {
          showModal('error', '신고 대상을 찾을 수 없습니다.')
        } else if (status === 409) {
          showModal('error', '이미 신고한 내용입니다.')
        } else if (status === 429) {
          showModal(
            'error',
            '신고 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
          )
        } else if (status && status >= 500) {
          showModal(
            'error',
            '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          )
        } else {
          showModal(
            'error',
            message || '신고 접수에 실패했습니다. 다시 시도해주세요.',
          )
        }
      } else {
        showModal(
          'error',
          '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
        )
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setReason('')
    setSelectedReason('')
    setCustomReason('')
    onClose()
  }

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason)
    if (reason !== '기타') {
      setCustomReason('')
    }
  }

  if (!isOpen) return null

  const targetTypeLabel = targetType === 'BOARD' ? '게시글' : '댓글'

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        ></div>
        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 max-w-lg mx-4 w-full transform transition-all">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
            disabled={submitting}
            aria-label="닫기"
          >
            ✕
          </button>

          {/* 제목 */}
          <div className="mb-6">
            <h3 className="text-2xl font-mainFont text-darkWalnut text-center mb-2">
              신고하기
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {targetTypeLabel}을 신고하는 사유를 선택해주세요.
            </p>
          </div>

          {/* 신고 사유 선택 */}
          <div className="mb-4">
            <label className="block text-sm font-gothicFont font-semibold text-gray-700 mb-3">
              신고 사유 선택
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {REPORT_REASONS.map((reasonOption) => (
                <button
                  key={reasonOption}
                  onClick={() => handleReasonSelect(reasonOption)}
                  disabled={submitting}
                  className={`px-4 py-2 rounded-lg text-sm font-gothicFont transition-all ${
                    selectedReason === reasonOption
                      ? 'bg-mainColor text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {reasonOption}
                </button>
              ))}
            </div>

            {/* 기타 선택 시 상세 입력 */}
            {selectedReason === '기타' && (
              <div className="mt-3">
                <label className="block text-sm font-gothicFont text-gray-700 mb-2">
                  상세 사유 입력
                </label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="신고 사유를 자세히 입력해주세요..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-mainColor"
                  rows={3}
                  disabled={submitting}
                />
              </div>
            )}

            {/* 직접 입력 옵션 */}
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <span className="text-sm text-gray-500">또는 직접 입력</span>
              </div>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value)
                  if (e.target.value) {
                    setSelectedReason('')
                    setCustomReason('')
                  }
                }}
                placeholder="신고 사유를 직접 입력해주세요..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-mainColor"
                rows={3}
                disabled={submitting}
              />
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mb-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600">
              💡 허위 신고는 제재를 받을 수 있습니다. 신중하게 신고해주세요.
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full font-mainFont text-darkWalnut bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
              disabled={submitting}
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className={`px-6 py-2.5 rounded-full font-mainFont text-white transition-colors shadow-md ${
                submitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-lg'
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
