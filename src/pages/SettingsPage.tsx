import React, { useState, useEffect } from 'react'
import { useUserProfileStore } from '../stores/useUserProfileStore'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import clsx from 'clsx'
import MoonRabbitStarsDark from '../assets/images/MoonRabbitStarsDark.png'
import LogoImg from '../assets/images/MoonRabbitSleep2.png'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'

const SettingsPage: React.FC = () => {
  const { 
    userProfile, 
    fetchUserProfile, 
    getEquippedBorder,
    getEquippedNicknameColor 
  } = useUserProfileStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState('한국어')
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [newNickname, setNewNickname] = useState('')

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  // 장착된 아이템 가져오기
  const equippedBorder = getEquippedBorder()
  const equippedNicknameColor = getEquippedNicknameColor()

  const handlePasswordChange = () => {
    alert('비밀번호 변경 기능은 준비 중입니다.')
  }

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/', '_blank')
  }

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

      // 프로필 다시 가져오기
      await fetchUserProfile(true)
      setIsEditingNickname(false)
      setNewNickname('')
      alert('닉네임이 변경되었습니다.')
    } catch (error) {
      console.error('닉네임 변경 실패:', error)
      alert('닉네임 변경에 실패했습니다.')
    }
  }

  return (
    <div
      style={{ backgroundImage: `url('${MoonRabbitStarsDark}')` }}
      className={clsx(
        'w-full min-h-screen bg-mainBlack bg-repeat flex items-center justify-center',
        isMobile ? 'py-4' : 'py-10'
      )}
    >
      <div
        className={clsx(
          'flex w-full',
          isMobile
            ? 'items-center justify-center flex-col m-4'
            : 'max-w-[1200px] h-full max-h-[600px] m-10',
        )}
      >
        {/* 좌측 로고 패널 */}
        <div
          className={clsx(
            'flex flex-col justify-center items-center font-mainFont text-darkWalnut bg-lightBeige',
            isMobile ? 'w-full py-8 px-6' : 'w-3/7 p-10',
          )}
        >
          <img
            src={LogoImg}
            alt="logo"
            className={clsx(isMobile ? 'w-[100px] pb-2' : 'w-[70%] pb-[10px]')}
          />
          <p className={clsx(isMobile ? 'text-[32px]' : 'text-[4vw] xl:text-[48px]')}>
            <span className="text-lightCaramel">달</span>토끼
          </p>
          <p className={clsx(
            'leading-[0.6]',
            isMobile ? 'text-[12px]' : 'text-[8px] sm:text-[1.2vw] xl:text-[16px]'
          )}>
            <span className="text-lightCaramel">Moon</span>Rabbit
          </p>
        </div>

        {/* 우측 설정 패널 */}
        <div
          className={clsx(
            'flex flex-col justify-start bg-white overflow-y-auto hide-scrollbar',
            isMobile ? 'w-full p-5' : 'w-4/7 p-10',
          )}
        >
          {/* 헤더 */}
          <div className={clsx(
            'flex items-center',
            isMobile ? 'mb-5' : 'mb-6'
          )}>
            {!isMobile && (
              <>
                <img
                  src={LogoImg}
                  alt="logo"
                  className="w-15 -ml-5 lg:w-20 mr-5 inline"
                />
                <div className="flex flex-col items-center font-mainFont text-darkWalnut -ml-2 mt-auto mb-2.5 lg:mb-4">
                  <span className="text-[2.5vw] lg:text-[30px]">
                    <span className="text-lightCaramel">달</span>토끼
                  </span>
                  <span className="text-[1vw] lg:text-[12px] leading-[0.6]">
                    <span className="text-lightCaramel">Moon</span>Rabbit
                  </span>
                </div>
              </>
            )}
            <div className={clsx(
              'flex items-end font-bold text-[14px]',
              isMobile ? 'w-full justify-center' : 'ml-auto'
            )}>
              <span className="text-darkWalnut">설정</span>
            </div>
          </div>

          {/* 계정 섹션 */}
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
              <div className={clsx(
                'relative flex-shrink-0',
                isMobile ? 'w-20 h-20' : 'w-14 h-14'
              )}>
                <img 
                  src={userProfile?.profileImage || "/images/MoonRabbitSleep2.png"} 
                  alt="프로필 이미지" 
                  className="w-full h-full object-cover rounded-full bg-zinc-900"
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

          {/* 보안 섹션 */}
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
          </section>

          {/* 기타 섹션 */}
          <section className={clsx(isMobile ? 'mb-5' : 'mb-6')}>
            <h2 className={clsx(
              'font-bold text-zinc-900 font-gothicFont',
              isMobile ? 'text-base mb-2' : 'text-lg lg:text-xl mb-3'
            )}>
              기타
            </h2>
            <div className="w-full h-[1px] bg-zinc-900 mb-4"></div>

            {/* 언어 */}
            <div className={clsx(isMobile ? 'mb-3' : 'mb-4')}>
              <div className={clsx(
                'text-zinc-900 mb-1 font-gothicFont',
                isMobile ? 'text-sm' : 'text-sm'
              )}>
                언어
              </div>
              <div className={clsx(
                'text-neutral-400 font-gothicFont',
                isMobile ? 'text-xs' : 'text-xs'
              )}>
                {language}
              </div>
            </div>

            {/* 다크모드 */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className={clsx(
                  'text-zinc-900 font-gothicFont',
                  isMobile ? 'text-sm' : 'text-sm'
                )}>
                  다크모드
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={(e) => setIsDarkMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={clsx(
                    'bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mainColor/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:bg-mainColor',
                    isMobile ? 'w-12 h-7 after:h-6 after:w-6' : 'w-11 h-6 after:h-5 after:w-5'
                  )}></div>
                </label>
              </div>
            </div>
          </section>

          {/* 앱 정보 섹션 */}
          <section>
            <h2 className={clsx(
              'font-bold text-black font-gothicFont',
              isMobile ? 'text-base mb-2' : 'text-lg lg:text-xl mb-3'
            )}>
              앱 정보
            </h2>
            <div className="w-full h-[1px] bg-black mb-4"></div>

            {/* 달토끼에 대해서 */}
            <div className="mb-3">
              <div className={clsx(
                'text-black font-gothicFont',
                isMobile ? 'text-sm' : 'text-sm'
              )}>
                달토끼에 대해서
              </div>
              <div className={clsx(
                'text-black mt-1 font-gothicFont',
                isMobile ? 'text-xs' : 'text-xs'
              )}>
                v. 1.0.0
              </div>
            </div>

            {/* 달토끼 인스타그램 */}
            <div className="mb-3">
              <button
                onClick={handleInstagramClick}
                className={clsx(
                  'font-gothicFont text-black hover:text-mainColor transition-colors',
                  isMobile ? 'text-sm' : 'text-sm'
                )}
              >
                달토끼 인스타그램
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage

