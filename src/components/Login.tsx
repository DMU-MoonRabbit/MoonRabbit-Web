import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, useAuthFormStore } from '../stores/useAuthStore'
import useUserStore from '../stores/useUserStore'
import clsx from 'clsx'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import LogoImg from '../assets/images/moonRabbitSleep2.png'
import GoogleLoginImg from '../assets/images/GoogleLogin.svg'
import kakaoLoginImg from '../assets/images/KakaoLogin.png'
import axios from 'axios'

export const LogoPanel = () => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center font-mainFont text-darkWalnut bg-lightBeige p-10',
        isMobile ? 'w-full' : 'w-3/7',
      )}
    >
      <img
        src={LogoImg}
        alt="logo"
        className={clsx(isMobile ? 'w-[140px] pb-[10px]' : 'w-[70%] pb-[10px]')}
      />
      <p className="text-[4vw] xl:text-[48px]">
        <span className="text-lightCaramel">달</span>토끼
      </p>
      <p className="text-[8px] sm:text-[1.2vw] xl:text-[16px] leading-[0.6]">
        <span className="text-lightCaramel">Moon</span>Rabbit
      </p>
    </div>
  )
}

export const LoginForm = () => {
  const { email, password, setEmail, setPassword } = useAuthStore()
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://moonrabbit-api.kro.kr/api/users/login',
        {
          email,
          password,
        },
      )
      console.log('응답 데이터:', response.data)
      // 토큰 localStorage 저장
      const { accessToken, refreshToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      // 로그인 상태 변경
      setIsLoggedIn(true)
      navigate('/')
    } catch (error) {
      console.error('에러:', error)
    }
  }

  const handleSNSLogin = (platform: string) => async () => {
    try {
      window.location.href = `http://moonrabbit-api.kro.kr/api/users/${platform}`
    } catch (error) {
      console.error('소셜 로그인 오류:', error)
      alert('소셜 로그인에 실패했습니다.')
    }
  }

  return (
    <div
      className={clsx(
        'flex flex-col justify-center p-15 bg-white',
        isMobile ? 'w-full' : 'w-4/7',
      )}
    >
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
      <div
        className={clsx(
          'flex gap-2',
          isMobile ? 'flex-col' : 'lg:gap-4 px-0 flex-col lg:flex-row lg:px-4',
        )}
      >
        <SocialLogin
          onClick={handleSNSLogin('google')}
          SNSLoginImg={GoogleLoginImg}
        />
        <SocialLogin
          onClick={handleSNSLogin('kakao')}
          SNSLoginImg={kakaoLoginImg}
        />
      </div>
    </div>
  )
}

export const SignupForm = () => {
  const setIsLogin = useAuthFormStore((state) => state.setIsLogin)

  const {
    email,
    phoneNum,
    verification,
    password,
    passwordConfirm,
    setEmail,
    setPhoneNum,
    setVerification,
    setPassword,
    setPasswordConfirm,
  } = useUserStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const handleSignup = async () => {
    // 유효성 검사
    if (!email || !phoneNum || !verification || !password || !passwordConfirm) {
      alert('모든 정보를 입력해주세요.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.')
      return
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const response = await axios.post(
        'http://moonrabbit-api.kro.kr/api/users/register',
        {
          email,
          password,
          passwordConfirm,
          phoneNum,
          verification,
        },
      )
      //console.log('응답 데이터:', response.data)
      alert('회원가입이 완료되었습니다!')
      setIsLogin(true)
    } catch (error) {
      console.error('에러:', error)
    }
  }

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        'http://moonrabbit-api.kro.kr/api/sms/send',
        {
          phoneNum,
        },
      )
      console.log('응답 데이터:', response.data)
    } catch (error) {
      console.error('에러:', error)
    }
  }

  return (
    <div
      className={clsx(
        'flex flex-col justify-center p-15 bg-white',
        isMobile ? 'w-full' : 'w-4/7',
      )}
    >
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
        value={phoneNum}
        onChange={(e: any) => setPhoneNum(e.target.value)}
      />
      <div className="flex gap-2">
        <LoginInputField
          type="string"
          placeholder="인증번호 확인"
          value={verification}
          onChange={(e: any) => setVerification(e.target.value)}
        />
        <LoginButton
          onClick={handleVerification}
          className="max-h-[42px] rounded-[5px] w-fit px-3 py-2 whitespace-nowrap"
        >
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
        value={passwordConfirm}
        onChange={(e: any) => setPasswordConfirm(e.target.value)}
        className="mb-8"
      />

      <LoginButton
        onClick={handleSignup}
        className="min-h-[56px] rounded-[10px]"
      >
        회원가입
      </LoginButton>
    </div>
  )
}

interface LoginInputFieldProps {
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}
export const LoginInputField = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}: LoginInputFieldProps) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full border border-mainColor rounded px-3 py-2 mb-3 focus:outline-none ${className}`}
  />
)

interface LoginButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
}
export const LoginButton = ({
  children,
  onClick,
  className,
}: LoginButtonProps) => (
  <button
    onClick={onClick}
    className={`${className} cursor-pointer font-subFont h-[56px] lg:h-[62px] py-2 text-white bg-mainColor hover:bg-orange-600 transition`}
  >
    {children}
  </button>
)

interface SocialLoginProps {
  SNSLoginImg: string
  onClick: () => void
}
export const SocialLogin = ({ SNSLoginImg, onClick }: SocialLoginProps) => {
  const isGoogle = SNSLoginImg === GoogleLoginImg
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  return (
    <div
      className={clsx(
        'cursor-pointer items-center justify-center flex rounded',
        isGoogle
          ? isMobile
            ? 'p-[2px] bg-[#F2F2F2] h-[50px]'
            : 'flex-1 bg-[#F2F2F2] p-1 min-h-[50px] max-h-[50px]'
          : isMobile
            ? 'bg-[#FEE500] h-[50px]'
            : 'flex-1 bg-[#FEE500] max-h-[50px]',
      )}
      onClick={onClick}
    >
      <img src={SNSLoginImg} className="h-full object-contain" />
    </div>
  )
}

export const LoginFormHeader = () => {
  const res = useResponsiveStore((state) => state.res)
  const setIsLogin = useAuthFormStore((state) => state.setIsLogin)
  const hoverText = `
    text-black 
    hover:text-transparent hover:bg-clip-text 
    hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 
    transition-all duration-500 ease-in-out
  `
  return res === 'pc' ? (
    <div className="mb-6 flex items-center">
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
      <div className="flex items-end font-bold ml-auto text-[14px] flex-col lg:items-center lg:flex-row">
        <span
          onClick={() => setIsLogin(true)}
          className={`cursor-pointer ${hoverText}`}
        >
          ID&PW 로그인
        </span>
        <div className="flex items-center">
          <div className="h-[25px] w-[1px] bg-black mx-2 opacity-0 lg:opacity-100" />
          <span
            onClick={() => setIsLogin(false)}
            className={`cursor-pointer ${hoverText}`}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex">
      <div className="flex items-center font-bold ml-auto mb-5">
        <span
          onClick={() => setIsLogin(true)}
          className={`cursor-pointer ${hoverText}`}
        >
          ID&PW 로그인
        </span>
        <div className="h-[25px] w-[1px] mx-2 bg-black" />
        <span
          onClick={() => setIsLogin(false)}
          className={`cursor-pointer ${hoverText}`}
        >
          회원가입
        </span>
      </div>
    </div>
  )
}
