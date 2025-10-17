import React, { useState, useRef } from 'react'
import { useUserProfileStore } from '../../stores/useUserProfileStore'
import { useResponsiveStore } from '../../stores/useResponsiveStore'
import clsx from 'clsx'
import axios from 'axios'
import { ENDPOINTS } from '../../api/endpoints'

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
      alert('닉네임을 입력해주세요.')
      return
    }

    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        alert('로그인이 필요합니다.')
        return
      }

      await axios.put(
        ENDPOINTS.USER_UPDATE,
        { nickname: newNickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      await fetchUserProfile(true)
      setIsEditingNickname(false)
      setNewNickname('')
      alert('닉네임이 변경되었습니다.')
    } catch (error) {
      console.error('닉네임 변경 실패:', error)
      alert('닉네임 변경에 실패했습니다.')
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
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    try {
      setIsUploadingImage(true)
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        alert('로그인이 필요합니다.')
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      // 새로운 통합 API 사용 - 업로드와 프로필 업데이트를 한 번에 처리
      const response = await axios.post(
        ENDPOINTS.USER_PROFILE_IMAGE,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log('프로필 이미지 업데이트 성공:', response.data)

      // 프로필 새로고침
      await fetchUserProfile(true)
      alert('프로필 이미지가 변경되었습니다.')
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      if (axios.isAxiosError(error) && error.response) {
        alert(`이미지 업로드에 실패했습니다: ${error.response.data.message || '서버 오류'}`)
      } else {
        alert('이미지 업로드에 실패했습니다.')
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
              isMobile ? 'w-20 h-20' : 'w-14 h-14'
            )}
            onClick={handleProfileImageClick}
          >
            <img 
              src={userProfile?.profileImage || userProfile?.profileImg || "/images/MoonRabbitSleep2.png"} 
              alt="프로필 이미지" 
              className={clsx(
                'w-full h-full object-cover rounded-full bg-zinc-900 transition-opacity',
                isUploadingImage ? 'opacity-50' : 'group-hover:opacity-80'
              )}
              onError={(e) => {
                e.currentTarget.src = '/images/MoonRabbitSleep2.png'
              }}
            />
            {equippedBorder && (
              <img
                src={equippedBorder.imageUrl}
                alt="프로필 테두리"
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              />
            )}
            
            {/* 오버레이 아이콘 */}
            {!isUploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg 
                  className="w-6 h-6 text-white" 
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
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
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
    </section>
  )
}

export default AccountSection

