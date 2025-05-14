import React from "react"
import useAuthStore from "../stores/useAuthStore"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import { LogoPanel, LoginInputField, LoginButton, LoginFormHeader } from "../components/Login"
import GoogleLoginImg from "../assets/images/GoogleLogin.svg"
import kakaoLoginImg from "../assets/images/KakaoLogin.png"

const LoginForm = ({ className }: any) => {
  const { email, password, setEmail, setPassword } = useAuthStore()
  const res = useResponsiveStore((state) => state.res)

  const handleLogin = () => {
    
  }

  return (
    <div className={`flex flex-col justify-center p-15 bg-white ${className}`}>
      <LoginFormHeader />

      <LoginInputField
        type="email"
        placeholder="이메일 (e-mail)"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />

      <LoginInputField
        type="password"
        placeholder="비밀번호 (Password)"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />

      <div className="text-sm ml-[16px] mb-10">아이디 / 비밀번호 찾기</div>

      <LoginButton onClick={handleLogin} className="mb-4 rounded-[10px]">
        로그인 (Login)
      </LoginButton>

      {res === 'pc' ? (
        <div className="flex gap-2 lg:gap-4 px-0 flex-col lg:flex-row lg:px-4">
          <div className="cursor-pointer flex-1 items-center justify-center flex p-1 bg-[#F2F2F2] rounded min-h-[50px] max-h-[50px]">
            <img src={GoogleLoginImg} className="h-full object-contain"/>
          </div>
          <div className="cursor-pointer flex-1 items-center justify-center flex bg-[#FEE500] rounded max-h-[50px]">
            <img src={kakaoLoginImg} className="h-full object-contain"/>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="cursor-pointer items-center justify-center flex p-[2px] bg-[#F2F2F2] rounded h-[50px]">
            <img src={GoogleLoginImg} className="h-full object-contain"/>
          </div>
          <div className="cursor-pointer items-center justify-center flex bg-[#FEE500] rounded h-[50px]">
            <img src={kakaoLoginImg} className="h-full object-contain"/>
          </div>
        </div>
      )}
      
    </div>
  )
}


const LoginPage: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
    {/*이거 반응형으로 나눈거 컴포넌트에서 설정하는거로 수정예정 */}
    {res === 'pc' ? (
      <div className="flex w-full max-w-[1200px] h-full max-h-[600px] m-10">
        <LogoPanel divClassName='w-3/7' imgClassName='w-[70%] pb-[10px]' />
        <LoginForm className='w-4/7'/>
      </div>
    ) : (
      <div className="flex flex-col w-full items-center justify-center m-10">
        <LogoPanel divClassName='w-full' imgClassName='w-[140px] pb-[10px]' />
        <LoginForm className='w-full'/>
      </div>
    )}
    </div>
  )
}

export default LoginPage