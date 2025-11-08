import React, { useState, useEffect } from 'react'
import { IoMdMenu, IoMdSettings } from "react-icons/io"
import { FaSearch, FaPlus, FaHistory, FaTrash, FaEdit } from "react-icons/fa"
import { MdChat, MdDelete } from "react-icons/md"
import axios from 'axios'
import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen, onToggle, onNewChat, currentChatId, setCurrentChatId, setMessages}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const res = await axios.get(import.meta.env.VITE_API_URL + '/api/history')
      setChatHistory(res.data.history || [])
    } catch (error) {
      console.log("Error in fetching history", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredHistory = chatHistory.filter(chat =>
    chat.prompt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const truncateText = (text, maxLength = 40) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }


  const handleChatClick = async(chatId) => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + `/api/chat`, {
        params: { chatId : chatId }
      })
        setMessages([
          { role: 'user', content: res.data.chat.prompt },
          { role: 'assistant', content: res.data.chat.response }
        ])
        setCurrentChatId(chatId)
      }
     catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-black via-gray-900 to-black backdrop-blur-md border-r border-gray-800/50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-full shadow-2xl
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-lg flex items-center justify-center shadow-lg">
                <MdChat className="text-white text-lg" />
              </div>
              <Link to='/' className="text-xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Roaster AI</Link>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
            >
              <IoMdMenu size={20} />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 border border-gray-600 hover:border-gray-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <FaPlus size={16} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-800/50">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gradient-to-r from-gray-800/50 via-gray-900/30 to-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 shadow-lg"
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <FaHistory className="text-gray-400 text-sm" />
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Recent Chats</h3>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MdChat className="mx-auto text-3xl mb-2 opacity-50" />
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs mt-1">Start a new chat to see your history</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredHistory.map((chat, index) => (
                  <div 
                    onClick={() => handleChatClick(chat._id)}
                    key={index}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-800/50 hover:via-gray-900/30 hover:to-gray-800/50 border border-transparent hover:border-gray-700/50 shadow-sm hover:shadow-md ${
                      currentChatId === chat._id ? 'bg-gradient-to-r from-gray-800/50 via-gray-900/30 to-gray-800/50 border-gray-700/50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium mb-1 line-clamp-2">
                          {truncateText(chat.prompt || 'Untitled Chat')}
                        </h4>
                        <p className="text-gray-500 text-xs">
                          {new Date(chat.createdAt || Date.now()).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1">
                        <button
                          className="p-1.5 rounded-md hover:bg-gray-800/50 text-gray-500 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          className="p-1.5 rounded-md hover:bg-red-900/20 text-gray-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800/50">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800/50 text-gray-500 hover:text-white transition-colors">
            <IoMdSettings size={18} />
            <span className="text-sm font-medium">Settings & Help</span>
          </button>
          
          {/* User Info */}
          <div className="mt-3 flex items-center space-x-3 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-900/50 via-black/30 to-gray-900/50 border border-gray-800/50">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-600 via-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">User</p>
              <p className="text-gray-500 text-xs">Free Plan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar