import React from "react"
import MypageProfile from "../components/MypageProfile"
import MypageSidebar from "../components/MypageSidebar"
import MypageCountSection from "../components/MypageCountSection"
import clsx from "clsx"
import { useResponsiveStore } from "../stores/useResponsiveStore"

const MypagePage: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  
  return (
    <div className={clsx("flex justify-between", 
      isMobile ? 
      "flex-col min-h-[500px]" : "min-h-[700px]"
    )}>
      <div className="flex flex-col w-full">
        <MypageProfile />
        <MypageCountSection />
      </div>
      <MypageSidebar />
    </div>
  )
}

export default MypagePage