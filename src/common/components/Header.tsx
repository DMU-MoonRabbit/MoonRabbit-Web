import { Menu, X } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from '@/api/axios'
import { ENDPOINTS } from '@/api/endpoints'

import { useAuthStore } from '../../features/auth/stores/useAuthStore'
import useUserStore from '../../features/mypage/stores/useUserStore'
import { useResponsiveStore } from '../hooks/useResponsiveStore'

import MiniModal from './MiniModal'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const { res, setRes } = useResponsiveStore()
  const { isLoggedIn, logout } = useAuthStore()
  const { nickname, setNickname } = useUserStore()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isMobile = res === 'mo'

  useEffect(() => {
    const handleResize = () => {
      setRes(window.innerWidth >= 768 ? 'pc' : 'mo')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setRes])

  useEffect(() => {
    if (isLoggedIn && !nickname) {
      const fetchNickname = async () => {
        const token = localStorage.getItem('accessToken')
        try {
          const response = await axios.get(ENDPOINTS.USER_PROFILE, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setNickname(response.data.nickname)
        } catch (error) {
          console.error('닉네임 조회 실패', error)
        }
      }
      fetchNickname()
    }
  }, [isLoggedIn, nickname, setNickname])

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleLogoutConfirm = () => {
    logout()
    setNickname('')
    localStorage.removeItem('cachedUser')
    navigate('/login')
    setIsLogoutModalOpen(false)
  }

  return (
    <div className="bg-darkWalnut text-darkBeige h-14 flex items-center justify-between px-6 md:px-8 shadow-md relative">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl">
          ⋆˚.•✩‧₊⋆
        </Link>

        {/* PC용 네비게이션(왼쪽) */}
        {!isMobile && (
          <nav className="flex tracking-wide space-x-10 font-mainFont text-base">
            <Link to="/night-sky">밤하늘</Link>
            <Link to="/question">오늘의 질문</Link>
            <Link to="/stars">별자리</Link>
            <Link to="/shop">상점</Link>
          </nav>
        )}
      </div>

      {/* PC용 네비게이션(오른쪽) */}
      {!isMobile && (
        <div className="flex items-center space-x-10 font-mainFont text-base">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                {nickname}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 p-1 w-36 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <Link
                    to="/mypage"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-left text-darkWalnut hover:bg-mainColor hover:text-white transition-colors rounded-lg cursor-pointer"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false)
                      setIsLogoutModalOpen(true)
                    }}
                    className="block w-full text-left px-4 py-2 text-darkWalnut hover:bg-red-500 hover:text-white transition-colors rounded-lg cursor-pointer"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">로그인 / 회원가입</Link>
          )}
          <Link to="/settings">설정</Link>
        </div>
      )}

      {/* Mobile 햄버거 버튼 */}
      {isMobile && (
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="메뉴 토글"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile 드롭다운 메뉴 */}
      {isOpen && isMobile && (
        <div className="absolute top-14 left-0 w-full bg-darkWalnut flex flex-col items-start px-6 py-4 space-y-4 font-mainFont text-base z-50 shadow-lg">
          <Link to="/night-sky" onClick={() => setIsOpen(false)}>
            밤하늘
          </Link>
          <Link to="/question" onClick={() => setIsOpen(false)}>
            오늘의 질문
          </Link>
          <Link to="/stars" onClick={() => setIsOpen(false)}>
            별자리
          </Link>
          <Link to="/shop" onClick={() => setIsOpen(false)}>
            상점
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/mypage" onClick={() => setIsOpen(false)}>
                {nickname}
              </Link>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              로그인 / 회원가입
            </Link>
          )}
          <Link to="/settings" onClick={() => setIsOpen(false)}>
            설정
          </Link>
        </div>
      )}

      {/* 로그아웃 확인 모달 */}
      <MiniModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        type="confirm"
        title="로그아웃"
        message="정말 로그아웃 하시겠습니까?"
        onConfirm={handleLogoutConfirm}
        confirmText="로그아웃"
        cancelText="취소"
      />
    </div>
  )
}

export default Header
