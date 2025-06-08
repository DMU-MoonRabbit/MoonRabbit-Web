import React, { useEffect } from 'react'
import { useResponsiveStore } from './stores/useResponsiveStore'
import { useAuthStore } from './stores/useAuthStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import LoginSignupPage from './pages/LoginSignupPage'
import NightSkyPage from './pages/NightSkyPage'
import NightSkyDetailPage from './pages/NightSkyDetailPage'
import Footer from './components/Footer'
import LoginLoadingPage from './pages/LoginLoadingPage'

function App() {
  const setRes = useResponsiveStore((state) => state.setRes)
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)

  useEffect(() => {
    // 토큰 체크
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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
