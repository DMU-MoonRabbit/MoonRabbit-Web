import React from 'react'
import { X } from 'lucide-react'
import clsx from 'clsx'

interface MiniModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  type?: 'success' | 'error' | 'confirm'
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
}

const MiniModal: React.FC<MiniModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
}) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-fadeIn">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* 아이콘 */}
        <div className="flex justify-center mb-4">
          {type === 'success' && (
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {type === 'error' && (
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          {type === 'confirm' && (
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* 타이틀 */}
        {title && (
          <h3 className="text-xl font-mainFont text-darkWalnut text-center mb-2">
            {title}
          </h3>
        )}

        {/* 메시지 */}
        <p className="text-darkWalnut font-gothicFont text-center mb-6 leading-relaxed">
          {message}
        </p>

        {/* 버튼 */}
        <div className={clsx('flex gap-3', type === 'confirm' ? 'justify-center' : 'justify-center')}>
          {type === 'confirm' && (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full font-mainFont text-darkWalnut bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={clsx(
              'px-6 py-2 rounded-full font-mainFont text-white transition-colors',
              type === 'error'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-mainColor hover:bg-opacity-80'
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MiniModal

