import React, { useMemo, useState, memo, useCallback } from "react"
import LevelStar from "../assets/images/LevelStar.png"
import CenteredPopup from "./CenteredPopup"
import MyBoardContents from "./MyBoardContents"
import clsx from "clsx"
import { useResponsiveStore } from "../stores/useResponsiveStore"

const MypageSidebar: React.FC = memo(() => {
  const level = 88
  const [showAllStars, setShowAllStars] = useState(false)
  const [popupOpen, setPopupOpen] = useState<null | 'nightSky' | 'constellation'>(null)

  const starCount = useMemo(() => Math.floor(level / 10), [level])
  const visibleStarCount = useMemo(
    () => (showAllStars ? starCount : Math.min(5, starCount)),
    [showAllStars, starCount]
  )
  
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const handleNightSkyClick = useCallback(() => setPopupOpen('nightSky'), [])
  const handleConstellationClick = useCallback(() => setPopupOpen('constellation'), [])
  const handleClosePopup = useCallback(() => setPopupOpen(null), [])
  const handleShowAllStars = useCallback(() => setShowAllStars(true), [])
  const handleHideStars = useCallback(() => setShowAllStars(false), [])

  return (
    <div className={clsx("bg-darkWalnut px-4 flex flex-col justify-center gap-4 border-b-1 border-subBlack",
      isMobile ?
      "w-full pb-12 " : "w-[500px]"
    )}>
      <div className={clsx("font-mainFont text-white",
        isMobile ?
        "pt-8 text-[16px]" : "text-[2vw]"
      )}>
        레벨
        <span className={clsx(isMobile ? "" : "ml-[1vw]")}>
          {level}
        </span>
      </div>
      <div className={clsx(isMobile ? "" : "p-3")}>
        <div className="grid grid-cols-5 gap-2 place-items-center">
          {Array.from({ length: visibleStarCount }).map((_, index) => (
            <img
              key={index}
              src={LevelStar}
              alt="레벨 별"
              className={clsx("object-contain", 
                isMobile ?
                "w-8 h-8" : "w-10 h-10"
              )}
            />
          ))}
        </div>
        {starCount > 5 && !showAllStars && (
          <button
            onClick={handleShowAllStars}
            className={clsx("mt-4 text-white block ml-auto font-gothicFont",
              isMobile ? "text-[12px]" : "text-[1vw]"
            )}
          >
            더보기
          </button>
        )}
        {starCount > 5 && showAllStars && (
          <button
            onClick={handleHideStars}
            className={clsx("mt-4 text-white block ml-auto font-gothicFont",
              isMobile ? "text-[12px]" : "text-[1vw]"
            )}
          >
            접기
          </button>
        )}
      </div>
      <button onClick={handleNightSkyClick} className={clsx('cursor-pointer flex items-center justify-center rounded-xl bg-mainColor text-white font-mainFont w-full py-2 mr-8',
        isMobile ? "text-[16px]" : "text-[1.5vw]"
      )}>
        내 밤하늘
      </button>
      <button onClick={handleConstellationClick} className={clsx('cursor-pointer flex items-center justify-center rounded-xl bg-mainColor text-white font-mainFont w-full py-2 mr-8',
        isMobile ? "text-[16px]" : "text-[1.5vw]"
      )}>
        내 아이템
      </button>

      <CenteredPopup
        title={popupOpen === 'nightSky' ? '내 밤하늘' : '내 아이템'}
        isOpen={popupOpen !== null}
        onClose={handleClosePopup}
      >
        {popupOpen === 'nightSky' ? <MyBoardContents /> : '내 아이템 목록'}
      </CenteredPopup>

    </div>
  )
})

export default MypageSidebar