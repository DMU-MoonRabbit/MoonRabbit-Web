import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'


function App() {

  return (
    <Router>
      {/* 라우팅 처리 부분 */}
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;