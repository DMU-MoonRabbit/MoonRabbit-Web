import React from "react"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import { LogoPanel, LoginForm } from "../components/Login"
import clsx from "clsx"

const LoginPage: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className={clsx('flex w-full m-10', isMobile ? ' items-center justify-center flex-col' : 'max-w-[1200px] h-full max-h-[600px]')}>
        <LogoPanel />
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage