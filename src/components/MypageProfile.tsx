import React, { memo, useCallback, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import { useUserProfileStore } from "../stores/useUserProfileStore"
import clsx from 'clsx'

const MypageProfile: React.FC = memo(() => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuthStore()
  const { 
    userProfile, 
    loading, 
    error, 
    fetchUserProfile, 
    fetchUserInventory,
    getEquippedBorder,
    getEquippedBanner,
    getEquippedNicknameColor
  } = useUserProfileStore()

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  useEffect(() => {
    console.log('userProfile:', userProfile)
    console.log('point:', userProfile?.point)
  }, [userProfile])

  useEffect(() => {
    if (userProfile?.id) {
      fetchUserInventory(userProfile.id)
    }
  }, [userProfile?.id, fetchUserInventory])

  // 장착된 아이템 가져오기
  const equippedBorder = getEquippedBorder()
  const equippedBanner = getEquippedBanner()
  const equippedNicknameColor = getEquippedNicknameColor()

  const handleLogout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/')
  }, [navigate, setIsLoggedIn])

  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const backgroundStyle = useMemo(() => ({
    aspectRatio: '5/1', 
    backgroundImage: equippedBanner?.imageUrl
      ? `url(${equippedBanner.imageUrl})` 
      : `url(/images/ConcernBackground.png)`, 
    backgroundSize: '100% 200%',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
  }), [equippedBanner])

  const profilePositionClass = useMemo(() => clsx("absolute", 
    isMobile ? "top-[2vw] left-3" : "-bottom-1/3 left-1/30"
  ), [isMobile])

  const profileImageClass = useMemo(() => clsx("object-cover rounded-full",
    isMobile ? "w-[60px]" : "w-1/8 h-full"
  ), [isMobile])

  const nameTextClass = useMemo(() => clsx("font-mainFont mb-[0.5vw]", 
    isMobile ? "text-[16px]" : "text-[2vw]"
  ), [isMobile])

  // 닉네임 색상 스타일
  const nicknameStyle = useMemo(() => {
    if (!equippedNicknameColor) return {}
    return { color: equippedNicknameColor }
  }, [equippedNicknameColor])

  const logoutButtonClass = useMemo(() => clsx("font-gothicFont font-thin cursor-pointer hover:bg-subBlack bg-mainGray text-white rounded-full mb-[1vw] xl:mb-[2vw] w-fit py-0.5",
    isMobile ? "text-[10px] px-2" : "text-[1vw] px-[1vw]"
  ), [isMobile])

  return (
    <div className="w-full">
      <div 
        className="relative w-full bg-center bg-no-repeat" 
        style={backgroundStyle}
      >
        <div className={profilePositionClass}> 
          <div className="flex items-center mb-2">
            {/* 프로필 이미지 + 테두리 */}
            <div className={clsx("relative flex-shrink-0", isMobile ? "w-[60px] h-[60px]" : "w-[120px] h-[120px]")}>
              <img 
                src={userProfile?.profileImage || "/images/MoonRabbitSleep2.png"} 
                alt="프로필 이미지" 
                className={clsx("object-cover rounded-full w-full h-full")}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/MoonRabbitSleep2.png'
                }}
              />
              {/* 장착된 테두리 SVG - 프로필 이미지와 정확히 같은 크기 */}
              {equippedBorder && (
                <img
                  src={equippedBorder.imageUrl}
                  alt="프로필 테두리"
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              )}
            </div>
             <div className="flex flex-col justify-center items-start ml-5">
               {/* 닉네임 + 포인트 */}
               <div className="flex items-center gap-2 mb-1">
                 <p className={nameTextClass} style={nicknameStyle}>
                   {loading ? '로딩 중...' : userProfile?.nickname || '사용자'}
                 </p>
                 
                 {userProfile && (
                   <div className="relative flex items-center">
                     <img 
                       src="/images/point.png" 
                       alt="포인트" 
                       className={isMobile ? "w-11 h-6" : "w-16 h-8"}
                       loading="lazy"
                       onError={(e) => {
                         console.error('포인트 이미지 로드 실패')
                       }}
                     />
                     <span className={clsx(
                       "absolute ml-5 inset-0 flex items-center justify-center font-mainFont text-darkWalnut font-bold",
                       isMobile ? "text-[10px]" : "text-xs"
                     )}>
                       {userProfile.point !== undefined ? userProfile.point : 0}
                     </span>
                   </div>
                 )}
               </div>
              
              
              {/* 에러 메시지 */}
              {error && (
                <p className="text-red-500 text-xs mb-1">{error}</p>
              )}
              
              {/* 로그아웃 버튼 */}
              <div 
                className={logoutButtonClass}
                onClick={handleLogout}
              >
                로그아웃
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
})

export default MypageProfile
