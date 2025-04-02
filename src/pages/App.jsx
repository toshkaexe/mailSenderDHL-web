import React from 'react'
import { Routes, Route } from 'react-router-dom'
import WelcomePage from "./WelcomePage";
import SuccessPage from "./UploadPage";


function App() {
  return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
  )
}

export default App
