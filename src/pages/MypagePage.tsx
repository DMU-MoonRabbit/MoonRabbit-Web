import React, { memo, useMemo, useEffect } from "react"
import MypageProfile from "../components/MypageProfile"
import MypageSidebar from "../components/MypageSidebar"
import MypageCountSection from "../components/MypageCountSection"
import clsx from "clsx"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import { useUserProfileStore } from "../stores/useUserProfileStore"
import { useParams, useNavigate } from "react-router-dom"

const MypagePage: React.FC = memo(() => {
  const res = useResponsiveStore((state) => state.res)
  const { userId } = useParams()
  const navigate = useNavigate()
  const isMobile = res === 'mo'
  const { userProfile, fetchUserProfile } = useUserProfileStore()

  // 로그인한 사용자 프로필 조회
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken && !userProfile) {
      fetchUserProfile()
    }
  }, [fetchUserProfile, userProfile])

  // userId가 있고 로그인한 사용자의 ID와 같으면 /mypage로 리다이렉트
  useEffect(() => {
    if (userId && userProfile) {
      const targetUserId = parseInt(userId, 10)
      const currentUserId = userProfile.id
      
      if (currentUserId === targetUserId) {
        navigate('/mypage', { replace: true })
      }
    }
  }, [userId, userProfile, navigate])

  const containerClasses = useMemo(() => clsx("flex justify-between", 
    isMobile ? 
    "flex-col min-h-[500px]" : "min-h-[700px]"
  ), [isMobile])

  // url에 userId가 있으면 다른 사람의 페이지, 없으면 본인 페이지
  const targetUserId = userId ? parseInt(userId, 10) : undefined
  const isOwnPage = !targetUserId

  return (
    <div className={containerClasses}>
      <div className="flex flex-col w-full">
        <MypageProfile userId={targetUserId} isOwnPage={isOwnPage} />
        <MypageCountSection isOwnPage={isOwnPage} userId={targetUserId} />
      </div>
      <MypageSidebar isOwnPage={isOwnPage} />
    </div>
  )
})

export default MypagePage