import clsx from 'clsx'
import React from 'react'

import LogoImg from '../../assets/images/MoonRabbitSleep2.png'
import { useResponsiveStore } from '../hooks/useResponsiveStore'

const SettingsHeader: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  return (
    <div className={clsx('flex items-center', isMobile ? 'mb-5' : 'mb-6')}>
      {!isMobile && (
        <>
          <img
            src={LogoImg}
            alt="logo"
            className="w-15 -ml-5 lg:w-20 mr-5 inline"
          />
          <div className="flex flex-col items-center font-mainFont text-darkWalnut -ml-2 mt-auto mb-2.5 lg:mb-4">
            <span className="text-[2.5vw] lg:text-[30px]">
              <span className="text-lightCaramel">달</span>토끼
            </span>
            <span className="text-[1vw] lg:text-[12px] leading-[0.6]">
              <span className="text-lightCaramel">Moon</span>Rabbit
            </span>
          </div>
        </>
      )}
      <div
        className={clsx(
          'flex items-end font-bold text-[14px]',
          isMobile ? 'w-full justify-center' : 'ml-auto',
        )}
      >
        <span className="text-darkWalnut">설정</span>
      </div>
    </div>
  )
}

export default SettingsHeader
