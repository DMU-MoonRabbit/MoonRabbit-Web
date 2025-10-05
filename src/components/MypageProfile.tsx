import React, { memo, useCallback, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import { useUserProfileStore } from "../stores/useUserProfileStore"
import clsx from 'clsx'

const MypageProfile: React.FC = memo(() => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuthStore()
  const { userProfile, loading, error, fetchUserProfile } = useUserProfileStore()

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

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
    backgroundImage: `url(/images/ConcernBackground.png)`, 
    backgroundSize: 'cover'
  }), [])

  const profilePositionClass = useMemo(() => clsx("absolute", 
    isMobile ? "top-[2vw] left-3" : "-bottom-1/3 left-1/30"
  ), [isMobile])

  const profileImageClass = useMemo(() => clsx("object-cover rounded-full",
    isMobile ? "w-[60px]" : "w-1/8 h-full"
  ), [isMobile])

  const nameTextClass = useMemo(() => clsx("font-mainFont mb-[0.5vw]", 
    isMobile ? "text-[16px]" : "text-[2vw]"
  ), [isMobile])

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
          <div className="flex items-center">
            <img 
              src={userProfile?.profileImage || "/images/MoonRabbitSleep2.png"} 
              alt="프로필 이미지" 
              className={profileImageClass}
              style={{ aspectRatio: '1/1' }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/images/MoonRabbitSleep2.png'
              }}
            />
            <div className="flex flex-col h-full ml-4">
              <p className={nameTextClass}>
                {loading ? '로딩 중...' : userProfile?.nickname || '사용자'}
              </p>
              {error && (
                <p className="text-red-500 text-xs mb-1">{error}</p>
              )}
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
