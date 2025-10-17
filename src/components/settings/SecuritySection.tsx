import React, { useState } from 'react'
import { useUserProfileStore } from '../../stores/useUserProfileStore'
import { useResponsiveStore } from '../../stores/useResponsiveStore'
import clsx from 'clsx'
import MiniModal from '../MiniModal'

const SecuritySection: React.FC = () => {
  const { userProfile } = useUserProfileStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  // 모달 상태 관리
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
    setModalState({ ...modalState, isOpen: false })
  }

  const handlePasswordChange = () => {
    showModal('error', '비밀번호 변경 기능은 준비 중입니다.')
  }

  return (
    <section className={clsx(isMobile ? 'mb-5' : 'mb-6')}>
      <h2 className={clsx(
        'font-bold text-zinc-900 font-gothicFont',
        isMobile ? 'text-base mb-2' : 'text-lg lg:text-xl mb-3'
      )}>
        보안
      </h2>
      <div className="w-full h-[1px] bg-zinc-900 mb-4"></div>

      {/* 이메일 */}
      <div className={clsx(isMobile ? 'mb-3' : 'mb-4')}>
        <div className="text-sm text-zinc-900 mb-1 font-gothicFont">
          이메일
        </div>
        <div className="text-xs text-neutral-400 font-gothicFont break-all">
          {userProfile?.email || 'user@example.com'}
        </div>
      </div>

      {/* 비밀번호 변경 */}
      <div className="mb-3">
        <button
          onClick={handlePasswordChange}
          className={clsx(
            'font-gothicFont text-zinc-900 hover:text-mainColor transition-colors',
            isMobile ? 'text-sm' : 'text-sm'
          )}
        >
          비밀번호 변경
        </button>
      </div>

      {/* MiniModal */}
      <MiniModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        message={modalState.message}
      />
    </section>
  )
}

export default SecuritySection

