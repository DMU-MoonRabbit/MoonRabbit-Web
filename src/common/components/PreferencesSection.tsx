import clsx from 'clsx'
import React from 'react'

import { useResponsiveStore } from '../hooks/useResponsiveStore'

interface PreferencesSectionProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  language: string
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  isDarkMode,
  setIsDarkMode,
  language,
}) => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  return (
    <section className={clsx(isMobile ? 'mb-5' : 'mb-6')}>
      <h2
        className={clsx(
          'font-bold text-zinc-900 font-gothicFont',
          isMobile ? 'text-base mb-2' : 'text-lg lg:text-xl mb-3',
        )}
      >
        기타
      </h2>
      <div className="w-full h-[1px] bg-zinc-900 mb-4"></div>

      {/* 언어 */}
      <div className={clsx(isMobile ? 'mb-3' : 'mb-4')}>
        <div
          className={clsx(
            'text-zinc-900 mb-1 font-gothicFont',
            isMobile ? 'text-sm' : 'text-sm',
          )}
        >
          언어
        </div>
        <div
          className={clsx(
            'text-neutral-400 font-gothicFont',
            isMobile ? 'text-xs' : 'text-xs',
          )}
        >
          {language}
        </div>
      </div>

      {/* 다크모드 */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div
            className={clsx(
              'text-zinc-900 font-gothicFont',
              isMobile ? 'text-sm' : 'text-sm',
            )}
          >
            다크모드
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className={clsx(
                "bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mainColor/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:bg-mainColor",
                isMobile
                  ? 'w-12 h-7 after:h-6 after:w-6'
                  : 'w-11 h-6 after:h-5 after:w-5',
              )}
            ></div>
          </label>
        </div>
      </div>
    </section>
  )
}

export default PreferencesSection
