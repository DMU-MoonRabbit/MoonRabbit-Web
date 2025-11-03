import clsx from 'clsx'
import React from 'react'

import MoonRabbitStarsDark from '@/assets/images/MoonRabbitStarsDark.png'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import {
  LogoPanel,
  LoginForm,
  SignupForm,
} from '@/features/auth/components/Login'
import { useAuthFormStore } from '@/features/auth/stores/useAuthStore'

const LoginSignupPage: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  const { isLogin } = useAuthFormStore()

  return (
    <div
      style={{ backgroundImage: `url('${MoonRabbitStarsDark}')` }}
      className={clsx(
        'w-full bg-mainBlack bg-repeat flex items-center justify-center',
        isMobile ? 'min-h-screen py-4' : 'min-h-screen py-8',
      )}
    >
      <div
        className={clsx(
          'flex w-full',
          isMobile
            ? 'items-center justify-center flex-col mx-4'
            : 'max-w-[1200px] mx-10 my-auto',
        )}
      >
        <LogoPanel />
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  )
}

export default LoginSignupPage
