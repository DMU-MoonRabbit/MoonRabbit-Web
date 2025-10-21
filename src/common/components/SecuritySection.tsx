import axios from 'axios'
import clsx from 'clsx'
import React, { useState } from 'react'

import { ENDPOINTS } from '../../api/endpoints'
import { useUserProfileStore } from '../../features/mypage/stores/useUserProfileStore'
import { useResponsiveStore } from '../hooks/useResponsiveStore'

import MiniModal from './MiniModal'

const SecuritySection: React.FC = () => {
  const { userProfile } = useUserProfileStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  // 비밀번호 변경 상태 관리
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  })

  // 모달 상태 관리
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
    setModalState({ ...modalState, isOpen: false })
  }

  const handlePasswordChange = () => {
    setIsChangingPassword(true)
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    })
  }

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false)
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    })
  }

  const handleSavePassword = async () => {
    // 입력 검증
    if (!passwordForm.currentPassword.trim()) {
      showModal('error', '현재 비밀번호를 입력해주세요.')
      return
    }

    if (!passwordForm.newPassword.trim()) {
      showModal('error', '새 비밀번호를 입력해주세요.')
      return
    }

    if (passwordForm.newPassword.length < 8) {
      showModal('error', '새 비밀번호는 8자 이상이어야 합니다.')
      return
    }

    if (passwordForm.newPassword !== passwordForm.newPasswordConfirm) {
      showModal('error', '새 비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        showModal('error', '로그인이 필요합니다.')
        return
      }

      // 새로운 비밀번호 변경 API 시도
      await axios.patch(
        ENDPOINTS.USER_PROFILE_PASSWORD,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          newPasswordConfirm: passwordForm.newPasswordConfirm,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      )

      setIsChangingPassword(false)
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      })
      showModal('success', '비밀번호가 변경되었습니다.')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || '비밀번호 변경에 실패했습니다.'
        showModal('error', errorMessage)
      } else {
        showModal('error', '비밀번호 변경에 실패했습니다.')
      }
    }
  }

  return (
    <section className={clsx(isMobile ? 'mb-5' : 'mb-6')}>
      <h2
        className={clsx(
          'font-bold text-zinc-900 font-gothicFont',
          isMobile ? 'text-base mb-2' : 'text-lg lg:text-xl mb-3',
        )}
      >
        보안
      </h2>
      <div className="w-full h-[1px] bg-zinc-900 mb-4"></div>

      {/* 이메일 */}
      <div className={clsx(isMobile ? 'mb-3' : 'mb-4')}>
        <div className="text-sm text-zinc-900 mb-1 font-gothicFont">이메일</div>
        <div className="text-xs text-neutral-400 font-gothicFont break-all">
          {userProfile?.email || 'user@example.com'}
        </div>
      </div>

      {/* 비밀번호 변경 */}
      <div className="mb-3">
        {!isChangingPassword ? (
          <button
            onClick={handlePasswordChange}
            className={clsx(
              'font-gothicFont text-zinc-900 hover:text-mainColor transition-colors',
              isMobile ? 'text-sm' : 'text-sm',
            )}
          >
            비밀번호 변경
          </button>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-zinc-900 mb-1 font-gothicFont">
                현재 비밀번호
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-zinc-300 rounded text-sm font-gothicFont focus:outline-none focus:ring-2 focus:ring-mainColor/30"
                placeholder="현재 비밀번호를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-900 mb-1 font-gothicFont">
                새 비밀번호
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-zinc-300 rounded text-sm font-gothicFont focus:outline-none focus:ring-2 focus:ring-mainColor/30"
                placeholder="새 비밀번호를 입력하세요 (8자 이상)"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-900 mb-1 font-gothicFont">
                새 비밀번호 확인
              </label>
              <input
                type="password"
                value={passwordForm.newPasswordConfirm}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPasswordConfirm: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-zinc-300 rounded text-sm font-gothicFont focus:outline-none focus:ring-2 focus:ring-mainColor/30"
                placeholder="새 비밀번호를 다시 입력하세요"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSavePassword}
                className="flex-1 bg-mainColor text-white py-2 px-4 rounded text-sm font-gothicFont hover:bg-orange-600 transition-colors"
              >
                변경
              </button>
              <button
                onClick={handleCancelPasswordChange}
                className="flex-1 bg-gray-200 text-zinc-900 py-2 px-4 rounded text-sm font-gothicFont hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        )}
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
