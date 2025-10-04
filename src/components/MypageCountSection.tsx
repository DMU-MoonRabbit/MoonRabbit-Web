import React, { memo, useMemo } from "react"
import NightSkyBg from "../assets/images/NightSkyBackground.png"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import clsx from 'clsx'

const MypageCountSection: React.FC = memo(() => {
  const myBoardCount = 23;

  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${NightSkyBg})`
  }), [])

  return (
    <div className={clsx("bg-black rounded-b-3xl rounded-t-[30px]",
      isMobile ? "mx-2 my-4" : "mx-[2vw] my-[8vw]"
    )}>
      <div className="font-mainFont bg-white text-[16px] sm:text-[2vw] rounded-t-3xl pl-4 py-2">2024년 달토끼 돌아보기</div>
      <div className={clsx("flex text-white font-mainFont",
        isMobile ? "h-[150px]" : "h-[20vw]"
      )}>
        <div
          className="w-full p-4 sm:p-[2vw] rounded-b-3xl flex flex-col justify-end bg-center bg-cover"
          style={backgroundStyle}
        >
          <p className={clsx("font-gothicFont", isMobile ? "text-[20px]" : "text-[2vw]")}>내가 그린 밤하늘</p>
          <p className={clsx(isMobile ? "text-[28px]" : "text-[4vw]")}>{myBoardCount}</p>
        </div>
      </div>
    </div>
  )
})

export default MypageCountSection
