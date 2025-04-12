import React, { useEffect } from 'react'
import { useResponsiveStore } from './stores/useResponsiveStore'
import { BrowserRouter, Routes } from 'react-router-dom'
import Header from './components/Header'

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
      </div>
    </BrowserRouter>
  )
}

export default App
