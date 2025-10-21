import React from 'react'
import { useResponsiveStore } from '../hooks/useResponsiveStore'
import clsx from 'clsx'

const AppInfoSection: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/', '_blank')
  }

  return (
    <section>
      <h2 className={clsx(
        'font-bold text-black font-gothicFont',
        isMobile ? 'text-base mb-2' : 'text-lg lg:text-xl mb-3'
      )}>
        앱 정보
      </h2>
      <div className="w-full h-[1px] bg-black mb-4"></div>

      {/* 달토끼에 대해서 */}
      <div className="mb-3">
        <div className={clsx(
          'text-black font-gothicFont',
          isMobile ? 'text-sm' : 'text-sm'
        )}>
          달토끼에 대해서
        </div>
        <div className={clsx(
          'text-black mt-1 font-gothicFont',
          isMobile ? 'text-xs' : 'text-xs'
        )}>
          v. 1.0.0
        </div>
      </div>

      {/* 달토끼 인스타그램 */}
      <div className="mb-3">
        <button
          onClick={handleInstagramClick}
          className={clsx(
            'font-gothicFont text-black hover:text-mainColor transition-colors',
            isMobile ? 'text-sm' : 'text-sm'
          )}
        >
          달토끼 인스타그램
        </button>
      </div>
    </section>
  )
}

export default AppInfoSection

