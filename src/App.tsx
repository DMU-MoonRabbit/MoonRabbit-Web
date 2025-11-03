import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './common/components/Footer'
import Header from './common/components/Header'
import { useResponsiveStore } from './common/hooks/useResponsiveStore'
import { useAuthStore } from './features/auth/stores/useAuthStore'
import useUserStore from './features/mypage/stores/useUserStore'
import AdminPage from './pages/AdminPage'
import ConstellationPage from './pages/ConstellationPage'
import FAQPage from './pages/FAQPage'
import LoginLoadingPage from './pages/LoginLoadingPage'
import LoginSignupPage from './pages/LoginSignupPage'
import MainPage from './pages/MainPage'
import MypagePage from './pages/MypagePage'
import { NightSkyDetailPage } from './pages/NightSkyDetailPage'
import NightSkyPage from './pages/NightSkyPage'
import PrivacyPage from './pages/PrivacyPage'
import SettingsPage from './pages/SettingsPage'
import ShopPage from './pages/ShopPage'
import TermsPage from './pages/TermsPage'
import TodayQuestionPage from './pages/TodayQuestionPage'

function App() {
  const setRes = useResponsiveStore((state) => state.setRes)
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
  const setNickname = useUserStore((state) => state.setNickname)

  useEffect(() => {
    // 토큰 체크
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnbGF5QGtha2FvLmNvbSIsImF1dGgiOiJST0xFX0FETUlOIiwiaWF0IjoxNzYyMTA4NjY1LCJleHAiOjE3NjIxMTIyNjV9.PrYWVHrW0oA6CNMG2b0s8Qr22asHD-16tQDjHrDY5Tw')
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsLoggedIn(true)

      // cachedUser에서 닉네임 가져오기
      const cachedUser = localStorage.getItem('cachedUser')
      if (cachedUser) {
        try {
          const userData = JSON.parse(cachedUser)
          if (userData.nickname) {
            setNickname(userData.nickname)
          }
        } catch {
          // JSON 파싱 실패 시 무시
        }
      }
    }

    const handleResize = () => {
      setRes(window.innerWidth >= 768 ? 'pc' : 'mo')
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setRes, setIsLoggedIn, setNickname])

  return (
    <BrowserRouter>
      <div className="bg-lightBeige">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/loading" element={<LoginLoadingPage />} />
          <Route path="/night-sky" element={<NightSkyPage />} />
          <Route
            path="/night-sky/:pageNumber"
            element={<NightSkyDetailPage />}
          />
          <Route path="/stars" element={<ConstellationPage />} />
          <Route path="/question" element={<TodayQuestionPage />} />
          <Route path="/mypage" element={<MypagePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/mypage/:userId" element={<MypagePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
