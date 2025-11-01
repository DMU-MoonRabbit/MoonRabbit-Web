import React from 'react'
import ReactDOM from 'react-dom/client'

import './api/axios' // Axios 인터셉터 설정 초기화
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
