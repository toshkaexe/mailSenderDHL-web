import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SuccessPage from './pages/SuccessPage'

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
  )
}

export default App
