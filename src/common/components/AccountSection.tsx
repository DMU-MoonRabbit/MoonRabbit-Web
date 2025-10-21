import React, { useState, useRef } from 'react'
import { useUserProfileStore } from '../../features/mypage/stores/useUserProfileStore'
import { useResponsiveStore } from '../hooks/useResponsiveStore'
import clsx from 'clsx'
import axios from 'axios'
import { ENDPOINTS } from '../../api/endpoints'
import MiniModal from './MiniModal'

const AccountSection: React.FC = () => {
  const { 
    userProfile, 
    fetchUserProfile, 
    getEquippedBorder,
    getEquippedNicknameColor 
  } = useUserProfileStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [newNickname, setNewNickname] = useState('')
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
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

  const equippedBorder = getEquippedBorder()
  const equippedNicknameColor = getEquippedNicknameColor()

  const handleEditNickname = () => {
    setNewNickname(userProfile?.nickname || '')
    setIsEditingNickname(true)
  }

  const handleCancelEditNickname = () => {
    setIsEditingNickname(false)
    setNewNickname('')
  }

  const handleSaveNickname = async () => {
    if (!newNickname.trim()) {
      showModal('error', '닉네임을 입력해주세요.')
      return
    }

    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        showModal('error', '로그인이 필요합니다.')
        return
      }

      const response = await axios.patch(
        ENDPOINTS.USER_PROFILE_NICKNAME,
        { newNickname: newNickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      )

      await fetchUserProfile(true)
      setIsEditingNickname(false)
      setNewNickname('')
      showModal('success', '닉네임이 변경되었습니다.')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || '닉네임 변경에 실패했습니다.'
        showModal('error', errorMessage)
      } else {
        showModal('error', '닉네임 변경에 실패했습니다.')
      }
    }
  }

  const handleProfileImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      showModal('error', '이미지 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showModal('error', '파일 크기는 5MB 이하여야 합니다.')
      return
    }

    try {
      setIsUploadingImage(true)
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        showModal('error', '로그인이 필요합니다.')
        return
      }

      // 파일명을 안전한 형식으로 변환 (한글, 특수문자, 공백 제거)
      const timestamp = Date.now()
      const fileExtension = file.name.split('.').pop() || 'jpg'
      const safeFileName = `profile_${timestamp}.${fileExtension}`
      
      // 새로운 File 객체 생성 (안전한 파일명으로)
      const safeFile = new File([file], safeFileName, { type: file.type })

      const formData = new FormData()
      formData.append('file', safeFile)

      const response = await axios.post(
        ENDPOINTS.USER_PROFILE_IMAGE,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      // 프로필 새로고침
      await fetchUserProfile(true)
      showModal('success', '프로필 이미지가 변경되었습니다.')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = error.response.data
          const errorMessage = errorData?.message || errorData?.error || '서버 오류'
          
          if (errorMessage.includes('Data too long') || errorMessage.includes('profile_img')) {
            showModal('error', '이미지 URL이 너무 깁니다. 관리자에게 문의해주세요.')
          } else {
            showModal('error', `이미지 업로드에 실패했습니다: ${errorMessage}`)
          }
        } else if (error.request) {
          showModal('error', '서버 응답이 없습니다. 네트워크를 확인해주세요.')
        } else {
          showModal('error', '요청 설정 중 오류가 발생했습니다.')
        }
      } else {
        showModal('error', '이미지 업로드에 실패했습니다.')
      }
    } finally {
      setIsUploadingImage(false)
      // input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <section className={clsx(isMobile ? 'mb-5' : 'mb-6')}>
      <h2 className={clsx(
        'font-bold text-zinc-900 font-gothicFont',
        isMobile ? 'text-base mb-2' : 'text-lg lg:text-xl mb-3'
      )}>
        계정
      </h2>
      <div className="w-full h-[1px] bg-zinc-900 mb-4"></div>
      
      <div className={clsx(
        'flex gap-4 mb-4',
        isMobile ? 'flex-col items-center' : 'items-center'
      )}>
        {/* 프로필 이미지 */}
        <div className="relative group">
          <div
            className={clsx(
              'relative flex-shrink-0 cursor-pointer',
              isMobile ? 'w-24 h-24' : 'w-20 h-20'
            )}
            onClick={handleProfileImageClick}
            style={{ aspectRatio: '1 / 1' }}
            title={userProfile?.profileImage || userProfile?.profileImg ? '프로필 이미지 변경' : '프로필 이미지 업로드'}
          >
            <img 
              src={userProfile?.profileImage || userProfile?.profileImg || "/images/MoonRabbitSleep2.png"} 
              alt="프로필 이미지" 
              className={clsx(
                'absolute inset-0 w-full h-full object-cover rounded-full bg-zinc-900 transition-opacity',
                isUploadingImage ? 'opacity-50' : 'group-hover:opacity-80'
              )}
              style={{ aspectRatio: '1 / 1' }}
              onError={(e) => {
                e.currentTarget.src = '/images/MoonRabbitSleep2.png'
              }}
            />
            {equippedBorder && (
              <img
                src={equippedBorder.imageUrl}
                alt="프로필 테두리"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ aspectRatio: '1 / 1' }}
              />
            )}
            
            {/* 오버레이 아이콘 */}
            {!isUploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </div>
            )}
            
            {/* 로딩 스피너 */}
            {isUploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          
          {/* 숨겨진 파일 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          {/* 안내 텍스트 */}
          {isMobile && (
            <div className="text-xs text-neutral-500 text-center mt-2 font-gothicFont">
              {userProfile?.profileImage || userProfile?.profileImg ? '클릭하여 이미지 변경' : '클릭하여 이미지 업로드'}
            </div>
          )}
        </div>

        {/* 닉네임 */}
        <div className={clsx('flex-1', isMobile && 'w-full')}>
          <div className={clsx(
            'font-medium text-zinc-900 mb-1 font-gothicFont',
            isMobile ? 'text-center text-sm' : 'text-sm'
          )}>
            닉네임
          </div>
          {isEditingNickname ? (
            <div className={clsx(
              'flex gap-2',
              isMobile ? 'flex-col' : 'items-center'
            )}>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className={clsx(
                  'border border-mainColor rounded-[5px] font-gothicFont focus:outline-none focus:ring-2 focus:ring-mainColor/30',
                  isMobile ? 'w-full px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'
                )}
                style={{ color: equippedNicknameColor || '#473c2c' }}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNickname}
                  className={clsx(
                    'bg-mainColor text-white rounded hover:bg-orange-600 transition-colors whitespace-nowrap flex-1',
                    isMobile ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'
                  )}
                >
                  저장
                </button>
                <button
                  onClick={handleCancelEditNickname}
                  className={clsx(
                    'bg-gray-200 text-zinc-900 rounded hover:bg-gray-300 transition-colors whitespace-nowrap flex-1',
                    isMobile ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'
                  )}
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div className={clsx(
              'flex items-center gap-2',
              isMobile && 'justify-center'
            )}>
              <div 
                className={clsx(
                  'border border-mainColor rounded-[5px]',
                  isMobile ? 'px-4 py-2' : 'px-3 py-1.5'
                )}
                style={{ color: equippedNicknameColor || '#473c2c' }}
              >
                <span className={clsx(
                  'font-gothicFont',
                  isMobile ? 'text-sm' : 'text-xs'
                )}>
                  {userProfile?.nickname || '사용자'}
                </span>
              </div>
              <button
                onClick={handleEditNickname}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors group"
                title="닉네임 수정"
              >
                <svg 
                  className={clsx(
                    'text-zinc-600 group-hover:text-mainColor transition-colors',
                    isMobile ? 'w-5 h-5' : 'w-4 h-4'
                  )}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
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

export default AccountSection

