import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-darkWalnut text-darkBeige h-14 flex items-center justify-between px-8 shadow-md">
      <div className="flex items-center space-x-10">
        <Link to="/">
        ⋆˚.•✩‧₊⋆
        </Link>

        <nav className="flex font-mainFont text-sm tracking-wide">
          <Link to="/sky">밤하늘</Link>
          <Link to="/question">오늘의 질문</Link>
          <Link to="/stars">별자리</Link>
          <Link to="/shop">상점</Link>
        </nav>
      </div>

      <div className="flex items-center space-x-6 text-sm font-mainFont">
        <Link to="/login">로그인 / 회원가입</Link>
        <Link to="/settings">설정</Link>
      </div>
    </div>
  )
}

export default Header