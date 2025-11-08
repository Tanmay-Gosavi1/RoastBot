import React, { useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import Sidebar from './Sidebar'
import ChatInterface from './ChatInterface'

const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleNewChat = () => {
    setCurrentChatId(null)
    // Clear current chat and start fresh
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-60 p-2 bg-gradient-to-r from-gray-800/50 via-gray-900/30 to-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-lg text-white hover:bg-gradient-to-r hover:from-gray-700/60 hover:via-gray-800/40 hover:to-gray-700/60 transition-colors shadow-lg"
      >
        <IoMdMenu size={20} />
      </button>

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onNewChat={handleNewChat}
        currentChatId={currentChatId}
      />

      {/* Main Chat Area */}
      <ChatInterface 
        sidebarOpen={sidebarOpen}
      />
    </div>
  )
}

export default ChatLayout