import React from "react"
import useUserStore from "../stores/useUserStore"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import { LogoPanel, LoginInputField, LoginButton, LoginFormHeader } from "../components/Login"

const SignupForm = ({ className }: any) => {
  const { 
    email, 
    phoneNo, 
    verificationNo, 
    password, 
    confirmPassword, 
    setEmail,
    setPhoneNo,
    setVerificationNo,
    setPassword,
    setConfirmPassword, 
  } = useUserStore()
  const res = useResponsiveStore((state) => state.res)

  const handleSignup = () => {
    
  }
  const handleVerifyNo =() => {

  }

  return (
    <div className={`flex flex-col justify-center p-15 bg-white ${className}`}>
      <LoginFormHeader />

      <LoginInputField
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        className="mt-2"
      />

      <LoginInputField
        type="string"
        placeholder="전화번호"
        value={phoneNo}
        onChange={(e: any) => setVerificationNo(e.target.value)}
      />
      
      <div className="flex gap-2">
        <LoginInputField
          type="string"
          placeholder="인증번호 확인"
          value={verificationNo}
          onChange={(e: any) => setPhoneNo(e.target.value)}
        />
        <LoginButton onClick={handleVerifyNo} className="max-h-[42px] rounded-[5px] w-fit px-3 py-2 whitespace-nowrap">
          인증번호 전송
        </LoginButton>
      </div>
      
      <LoginInputField
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      
      <LoginInputField
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e: any) => setConfirmPassword(e.target.value)}
        className="mb-8"
      />

      <LoginButton onClick={handleSignup} className="min-h-[56px] rounded-[10px]">
        회원가입
      </LoginButton>
      
    </div>
  )
}


const SignupPage: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
    {res === 'pc' ? (
      <div className="flex w-full max-w-[1200px] h-full max-h-[600px] m-10">
        <LogoPanel divClassName='w-3/7' imgClassName='w-full' />
        <SignupForm className='w-4/7'/>
      </div>
    ) : (
      <div className="flex flex-col w-full items-center justify-center m-10">
        <LogoPanel divClassName='w-full' imgClassName='w-[180px]' />
        <SignupForm className='w-full'/>
      </div>
    )}
    </div>
  )
}

export default SignupPage