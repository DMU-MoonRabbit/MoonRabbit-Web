import React, { useEffect } from 'react'
import { useResponsiveStore } from './stores/useResponsiveStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MainPage from './pages/MainPage'
import LoginSignupPage from './pages/LoginSignupPage'
import NightSky from './pages/NightSky'
import Footer from './components/Footer'

function App() {
  const res = useResponsiveStore((state) => state.res)
  const setRes = useResponsiveStore((state) => state.setRes)

  useEffect(() => {
    const handleResize = () => {
      setRes(window.innerWidth >= 768 ? 'pc' : 'mo')
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setRes])

  return (
    <BrowserRouter>
      <div className='bg-lightBeige'>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/login' element={<LoginSignupPage />} />
          <Route path='/night-sky' element={<NightSky />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
