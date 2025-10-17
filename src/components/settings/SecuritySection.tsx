import React from 'react'
import { useUserProfileStore } from '../../stores/useUserProfileStore'
import { useResponsiveStore } from '../../stores/useResponsiveStore'
import clsx from 'clsx'

const SecuritySection: React.FC = () => {
  const { userProfile } = useUserProfileStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const handlePasswordChange = () => {
    alert('비밀번호 변경 기능은 준비 중입니다.')
  }

  return (
    <section className={clsx(isMobile ? 'mb-5' : 'mb-6')}>
      <h2 className={clsx(
        'font-bold text-zinc-900 font-gothicFont',
        isMobile ? 'text-base mb-2' : 'text-lg lg:text-xl mb-3'
      )}>
        보안
      </h2>
      <div className="w-full h-[1px] bg-zinc-900 mb-4"></div>

      {/* 이메일 */}
      <div className={clsx(isMobile ? 'mb-3' : 'mb-4')}>
        <div className="text-sm text-zinc-900 mb-1 font-gothicFont">
          이메일
        </div>
        <div className="text-xs text-neutral-400 font-gothicFont break-all">
          {userProfile?.email || 'user@example.com'}
        </div>
      </div>

      {/* 비밀번호 변경 */}
      <div className="mb-3">
        <button
          onClick={handlePasswordChange}
          className={clsx(
            'font-gothicFont text-zinc-900 hover:text-mainColor transition-colors',
            isMobile ? 'text-sm' : 'text-sm'
          )}
        >
          비밀번호 변경
        </button>
      </div>
    </section>
  )
}

export default SecuritySection

