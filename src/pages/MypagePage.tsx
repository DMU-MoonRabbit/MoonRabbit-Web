import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"

const MypagePage: React.FC = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuthStore()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/')
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[700px]">
      <div onClick={handleLogout} className='cursor-pointer px-5 py-3 font-mainFont text-mainWhite bg-mainColor rounded-2xl'>로그아웃</div>
    </div>
  )
}

export default MypagePage