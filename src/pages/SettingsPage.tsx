import clsx from 'clsx'
import React, { useState, useEffect } from 'react'

import LogoImg from '@/assets/images/MoonRabbitSleep2.png'
import MoonRabbitStarsDark from '@/assets/images/MoonRabbitStarsDark.png'
import AccountSection from '@/common/components/AccountSection'
import AppInfoSection from '@/common/components/AppInfoSection'
import PreferencesSection from '@/common/components/PreferencesSection'
import SecuritySection from '@/common/components/SecuritySection'
import SettingsHeader from '@/common/components/SettingsHeader'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import { useUserProfileStore } from '@/features/mypage/stores/useUserProfileStore'

const SettingsPage: React.FC = () => {
  const { fetchUserProfile } = useUserProfileStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language] = useState('한국어')

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  return (
    <div
      style={{ backgroundImage: `url('${MoonRabbitStarsDark}')` }}
      className={clsx(
        'w-full min-h-screen bg-mainBlack bg-repeat flex items-center justify-center',
        isMobile ? 'py-4' : 'py-10',
      )}
    >
      <div
        className={clsx(
          'flex w-full',
          isMobile
            ? 'items-center justify-center flex-col m-4'
            : 'max-w-[1200px] h-full max-h-[600px] m-10',
        )}
      >
        {/* 좌측 로고 패널 */}
        <div
          className={clsx(
            'flex flex-col justify-center items-center font-mainFont text-darkWalnut bg-lightBeige',
            isMobile ? 'w-full py-8 px-6' : 'w-3/7 p-10',
          )}
        >
          <img
            src={LogoImg}
            alt="logo"
            className={clsx(isMobile ? 'w-[100px] pb-2' : 'w-[70%] pb-[10px]')}
          />
          <p
            className={clsx(
              isMobile ? 'text-[32px]' : 'text-[4vw] xl:text-[48px]',
            )}
          >
            <span className="text-lightCaramel">달</span>토끼
          </p>
          <p
            className={clsx(
              'leading-[0.6]',
              isMobile
                ? 'text-[12px]'
                : 'text-[8px] sm:text-[1.2vw] xl:text-[16px]',
            )}
          >
            <span className="text-lightCaramel">Moon</span>Rabbit
          </p>
        </div>

        {/* 우측 설정 패널 */}
        <div
          className={clsx(
            'flex flex-col justify-start bg-white overflow-y-auto hide-scrollbar',
            isMobile ? 'w-full p-5' : 'w-4/7 p-10',
          )}
        >
          <SettingsHeader />
          <AccountSection />
          <SecuritySection />
          <PreferencesSection
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            language={language}
          />
          <AppInfoSection />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
