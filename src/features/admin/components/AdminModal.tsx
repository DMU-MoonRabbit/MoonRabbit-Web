import React from 'react'
import { X } from 'lucide-react'

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  disabled?: boolean
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  disabled = false,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={disabled ? undefined : onClose}></div>
      <div 
        className="relative z-10 bg-neutral-50 rounded-[20px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.16)] p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <img
              src="/images/MoonRabbitSleep2.png"
              alt="logo"
              className="w-16 h-16 mr-3"
            />
            <div className="flex flex-col font-mainFont text-darkWalnut">
              <div className="flex items-baseline">
                <span className="text-lightCaramel text-xl">달</span>
                <span className="text-darkWalnut text-xl">토끼</span>
              </div>
              <div className="flex items-baseline text-xs">
                <span className="text-lightCaramel">Moon</span>
                <span className="text-darkWalnut">Rabbit</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-darkWalnut hover:text-gray-600"
            disabled={disabled}
          >
            <X size={24} />
          </button>
        </div>

        {/* 타이틀 */}
        <h3 className="text-xl font-mainFont text-darkWalnut mb-6">
          {title}
        </h3>

        {/* 콘텐츠 */}
        {children}
      </div>
    </div>
  )
}

