import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"
import ConcernBackground from "../assets/images/ConcernBackground.png"
import MoonRabbitStars from "../assets/images/MoonRabbitStars.png"

const MypageProfile: React.FC = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuthStore()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/')
  }
  return (
    <div className="w-full">
      <div 
        className="relative w-full bg-center bg-no-repeat" 
        style={{ aspectRatio: '5/1', backgroundImage: `url(${ConcernBackground})`, backgroundSize: 'cover' }}
      >
        <div className="absolute -bottom-1/3 left-1/30"> 
          <div className="flex items-center">
            <img 
              src={MoonRabbitStars} 
              alt="프로필 이미지" 
              className="object-cover w-1/8 h-full bg-black rounded-full" style={{ aspectRatio: '1/1' }}
            />
            <div className="flex flex-col h-full ml-4">
              <p className="font-mainFont text-[2vw] mb-[0.5vw]">홍대걸코어룩</p>
              <div className="font-gothicFont font-thin cursor-pointer hover:bg-subBlack bg-mainGray text-white text-[1vw] rounded-full mb-[1vw] xl:mb-[2vw] w-fit px-[1vw] py-0.5" onClick={handleLogout}>로그아웃</div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default MypageProfile