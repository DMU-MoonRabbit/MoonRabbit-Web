import React, { useEffect } from 'react'
import { useResponsiveStore } from './stores/useResponsiveStore'
import { useAuthStore } from './stores/useAuthStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import LoginSignupPage from './pages/LoginSignupPage'
import NightSkyPage from './pages/NightSkyPage'
import { NightSkyDetailPage } from './pages/NightSkyDetailPage'
import ConstellationPage from './pages/ConstellationPage'
import TodayQuestionPage from './pages/TodayQuestionPage'
import Footer from './components/Footer'
import LoginLoadingPage from './pages/LoginLoadingPage'
import MypagePage from './pages/MypagePage'
import TermsPage from './pages/TermsPage'
import FAQPage from './pages/FAQPage'
import PrivacyPage from './pages/PrivacyPage'
import AdminPage from './pages/AdminPage'
import ShopPage from './pages/ShopPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  const setRes = useResponsiveStore((state) => state.setRes)
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  useEffect(() => {
    // 토큰 체크
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnbGF5QGtha2FvLmNvbSIsImF1dGgiOiJST0xFX0FETUlOIiwiaWF0IjoxNzYwNzkxMjAyLCJleHAiOjE3NjA3OTQ4MDJ9.KBh3WDhJoVO6m-4TYcTk5n_c1Nw-FFjMSZxPYDENLmM')
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsLoggedIn(true)
    }

    const handleResize = () => {
      setRes(window.innerWidth >= 768 ? 'pc' : 'mo')
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setRes, setIsLoggedIn])

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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
