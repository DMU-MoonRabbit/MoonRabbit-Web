import React from "react"
import LogoImg from "../assets/moonRabbitLogo.svg"
import { useResponsiveStore } from "../stores/useResponsiveStore"

export const LogoPanel = ({ divClassName, imgClassName }: any) => (
  <div className={`flex flex-col justify-center items-center font-mainFont text-darkWalnut bg-lightBeige p-10 ${divClassName}`}>
    <img src={LogoImg} alt="logo" className={`${imgClassName}`} />
    <p className="text-[4vw] xl:text-[48px]"><span className="text-lightCaramel">달</span>토끼</p>
    <p className="text-[8px] sm:text-[1.2vw] xl:text-[16px] leading-[0.6]"><span className="text-lightCaramel">Moon</span>Rabbit</p>
  </div>
)

export const LoginInputField = ({ type, placeholder, value, onChange, className }: any) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full border border-mainColor rounded px-3 py-2 mb-3 focus:outline-none ${className}`}
  />
)

export const LoginButton = ({ children, onClick, className }: any) => (
  <button
    onClick={onClick}
    className={`cursor-pointer font-subFont w-full h-[50px] lg:h-[4vw] max-h-[62px] py-2 rounded-[10px] text-white bg-mainColor hover:bg-orange-600 transition ${className}`}
  >
    {children}
  </button>
)

export const LoginFormHeader = () => {
  const res = useResponsiveStore((state) => state.res)
  return res === 'pc' ? (
    <div className="mb-6 flex items-center">
      <img src={LogoImg} alt="logo" className="w-20 -ml-5 lg:w-30 inline" />
      <div className="flex flex-col items-center font-mainFont text-darkWalnut -ml-2 mt-auto mb-4">
        <span className="text-[2.5vw] lg:text-[30px]">
          <span className="text-lightCaramel">달</span>토끼
        </span>
        <span className="text-[1vw] lg:text-[12px] leading-[0.6]">
          <span className="text-lightCaramel">Moon</span>Rabbit
        </span>
      </div>
      <div className="flex items-end font-bold ml-auto text-[14px] flex-col lg:items-center lg:flex-row">
        <span>ID&PW 로그인</span>
        <div className="flex items-center">
          <div className="h-[25px] w-[1px] bg-black mx-2 opacity-0 lg:opacity-100" />
          <span>회원가입</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex">
      <div className="flex items-center font-bold ml-auto mb-5">
        <span>ID&PW 로그인</span>
        <div className="h-[25px] w-[1px] mx-2 bg-black" />
        <span>회원가입</span>
      </div>
    </div>
  )
}