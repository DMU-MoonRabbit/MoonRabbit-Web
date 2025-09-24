import React from "react"
import MypageProfile from "../components/MypageProfile"
import MypageSidebar from "../components/MypageSidebar"
import MypageCountSection from "../components/MypageCountSection"

const MypagePage: React.FC = () => {
  
  return (
    <div className="flex justify-between min-h-[700px]">
      <div className="flex flex-col w-full">
        <MypageProfile />
        <MypageCountSection />
      </div>
      <MypageSidebar />
    </div>
  )
}

export default MypagePage