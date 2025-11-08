import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ChatLayout from './components/ChatLayout'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<ChatLayout />} />
      </Routes>
    </div>
  )
}

export default App