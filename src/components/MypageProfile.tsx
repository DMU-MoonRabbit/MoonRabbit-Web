import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"
import ConcernBackground from "../assets/images/ConcernBackground.png"
import MoonRabbitStars from "../assets/images/MoonRabbitStars.png"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import clsx from 'clsx'

const MypageProfile: React.FC = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuthStore()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/')
  }
  
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  
  return (
    <div className="w-full">
      <div 
        className="relative w-full bg-center bg-no-repeat" 
        style={{ aspectRatio: '5/1', backgroundImage: `url(${ConcernBackground})`, backgroundSize: 'cover' }}
      >
        <div className={clsx("absolute", isMobile ? "top-[2vw] left-3" : "-bottom-1/3 left-1/30")}> 
          <div className="flex items-center">
            <img 
              src={MoonRabbitStars} 
              alt="프로필 이미지" 
              className={clsx("object-cover bg-black rounded-full",
                isMobile ? "w-[60px] " : "w-1/8 h-full"
              )} style={{ aspectRatio: '1/1' }}
            />
            <div className="flex flex-col h-full ml-4">
              <p className={clsx("font-mainFont mb-[0.5vw]", 
                isMobile ? "text-[16px]" : "text-[2vw]"
              )}>홍대걸코어룩</p>
              <div 
                className={clsx("font-gothicFont font-thin cursor-pointer hover:bg-subBlack bg-mainGray text-white rounded-full mb-[1vw] xl:mb-[2vw] w-fit  py-0.5",
                  isMobile ? "text-[10px] px-2" : "text-[1vw] px-[1vw]"
                )}
                onClick={handleLogout}>로그아웃</div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default MypageProfile