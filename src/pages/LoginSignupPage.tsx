import React from 'react'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import { useAuthFormStore } from '@/features/auth/stores/useAuthStore'
import { LogoPanel, LoginForm, SignupForm } from '@/features/auth/components/Login'
import clsx from 'clsx'
import MoonRabbitStarsDark from '@/assets/images/MoonRabbitStarsDark.png'

const LoginSignupPage: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  const { isLogin } = useAuthFormStore()

  return (
    <div
      style={{ backgroundImage: `url('${MoonRabbitStarsDark}')` }}
      className="w-full h-screen bg-mainBlack bg-repeat flex items-center justify-center"
    >
      <div
        className={clsx(
          'flex w-full m-10',
          isMobile
            ? ' items-center justify-center flex-col'
            : 'max-w-[1200px] h-full max-h-[600px]',
        )}
      >
        <LogoPanel />
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  )
}

export default LoginSignupPage
