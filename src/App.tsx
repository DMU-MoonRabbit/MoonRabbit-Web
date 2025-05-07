import React, { useEffect } from 'react'
import { useResponsiveStore } from './stores/useResponsiveStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'

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
      <div>
        <Header />
        
        <Routes>
          <Route path="/" element={
            <>
              <header>
                <h1>
                  {res === 'pc' ? 'PC View' : 'Mobile View'}
                </h1>
              </header>

              <main className="p-6 text-center">
                <p className="text-lg">
                  현재 뷰포트: {res}
                </p>
              </main>
            </>
          }/>

          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
