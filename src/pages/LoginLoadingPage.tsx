import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginLoadingPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token) {
      localStorage.setItem('accessToken', token)
      console.log(token)
      navigate('/')
    } else {
      console.error('토큰 없음')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>로그인 중...</p>
      <p className="mt-4">곧 메인페이지로 이동됩니다.</p>
    </div>
  )
}

export default LoginLoadingPage
