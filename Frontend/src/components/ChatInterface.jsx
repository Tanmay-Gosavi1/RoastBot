import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import ReactMarkDown from 'react-markdown'
import { FaPaperPlane, FaRobot, FaUser, FaCopy, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'
import Auth from '../authent/Authe'
import { toast } from 'react-toastify'

const ChatInterface = ({ sidebarOpen , messages , setMessages }) => {
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [inputMessage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || loading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)
    setError('')

    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/api/route', {
        prompt: inputMessage 
      })
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: res.data.generatedText,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error fetching response:', error)
      setError('Something went wrong. Please try again.')
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const regenerateResponse = async (messageId) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId)
    if (messageIndex === -1) return

    const userMessage = messages[messageIndex - 1]
    if (!userMessage || userMessage.type !== 'user') return

    setLoading(true)
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/api/route', { 
        prompt: userMessage.content 
      })
      
      const updatedMessages = [...messages]
      updatedMessages[messageIndex] = {
        ...updatedMessages[messageIndex],
        content: res.data.generatedText,
        timestamp: new Date()
      }
      
      setMessages(updatedMessages)
    } catch (error) {
      console.error('Error regenerating response:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className={`flex-1 flex flex-col h-screen bg-gradient-to-br from-black via-gray-900 to-black transition-all duration-300 ${
      sidebarOpen ? 'lg:ml-80' : ''
    }`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-md border-b border-gray-800/50 px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
            <FaRobot className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Roaster AI Chat</h1>
            <p className="text-sm text-gray-400">Your intelligent AI assistant</p>
          </div>
        </div>
        <Auth />
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <FaRobot className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent mb-2">Welcome to Roaster AI</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                I'm your AI assistant, ready to help you with anything from creative writing to problem-solving. 
                What would you like to explore today?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button 
                  onClick={() => setInputMessage("Help me write a creative story")}
                  className="p-4 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 border border-gray-800/50 rounded-xl hover:bg-gradient-to-br hover:from-gray-800/60 hover:via-gray-900/40 hover:to-gray-800/60 hover:border-gray-700/50 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
                >
                  <h4 className="text-white font-medium mb-1">Creative Writing</h4>
                  <p className="text-gray-400 text-sm">Generate stories, poems, and creative content</p>
                </button>
                <button 
                  onClick={() => setInputMessage("Explain quantum computing in simple terms")}
                  className="p-4 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 border border-gray-800/50 rounded-xl hover:bg-gradient-to-br hover:from-gray-800/60 hover:via-gray-900/40 hover:to-gray-800/60 hover:border-gray-700/50 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
                >
                  <h4 className="text-white font-medium mb-1">Learn & Explain</h4>
                  <p className="text-gray-400 text-sm">Get explanations for complex topics</p>
                </button>
                <button 
                  onClick={() => setInputMessage("Help me solve a coding problem")}
                  className="p-4 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 border border-gray-800/50 rounded-xl hover:bg-gradient-to-br hover:from-gray-800/60 hover:via-gray-900/40 hover:to-gray-800/60 hover:border-gray-700/50 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
                >
                  <h4 className="text-white font-medium mb-1">Code Assistant</h4>
                  <p className="text-gray-400 text-sm">Debug code and get programming help</p>
                </button>
                <button 
                  onClick={() => setInputMessage("Give me productivity tips for remote work")}
                  className="p-4 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 border border-gray-800/50 rounded-xl hover:bg-gradient-to-br hover:from-gray-800/60 hover:via-gray-900/40 hover:to-gray-800/60 hover:border-gray-700/50 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
                >
                  <h4 className="text-white font-medium mb-1">Productivity</h4>
                  <p className="text-gray-400 text-sm">Get tips for better work-life balance</p>
                </button>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-4 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                {message.type !== 'user' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                    message.type === 'error' ? 'bg-gradient-to-br from-red-600 to-red-500' : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700'
                  }`}>
                    <FaRobot className="text-white text-sm" />
                  </div>
                )}
                
                <div className={`max-w-3xl ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div className={`rounded-2xl px-6 py-4 shadow-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white ml-auto border border-gray-600' 
                      : message.type === 'error'
                      ? 'bg-gradient-to-br from-red-900/20 via-red-800/10 to-red-900/20 border border-red-500/30 text-red-300'
                      : 'bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 border border-gray-800/50 text-white'
                  }`}>
                    {message.type === 'user' ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkDown>{message.content}</ReactMarkDown>
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex items-center mt-2 space-x-2 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-gray-400">
                      {formatTime(message.timestamp)}
                    </span>
                    
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="p-1 rounded hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                          title="Copy"
                        >
                          <FaCopy size={12} />
                        </button>
                        <button
                          onClick={() => regenerateResponse(message.id)}
                          className="p-1 rounded hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                          title="Regenerate"
                          disabled={loading}
                        >
                          <MdRefresh size={12} />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-gray-800/50 text-gray-400 hover:text-green-400 transition-colors"
                          title="Good response"
                        >
                          <FaThumbsUp size={12} />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-gray-800/50 text-gray-400 hover:text-red-400 transition-colors"
                          title="Poor response"
                        >
                          <FaThumbsDown size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 via-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FaUser className="text-white text-sm" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                <FaRobot className="text-white text-sm" />
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 border border-gray-800/50 rounded-2xl px-6 py-4 shadow-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800/50 bg-gradient-to-r from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-md p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Shift + Enter for new line)"
                className="w-full px-4 py-3 pr-12 bg-gradient-to-br from-gray-800/50 via-gray-900/30 to-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 resize-none min-h-[3rem] max-h-32 shadow-lg"
                disabled={loading}
                rows={1}
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className={`absolute right-2 bottom-2 p-2 rounded-lg transition-all duration-200 shadow-lg ${
                  loading || !inputMessage.trim()
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-white bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 hover:scale-105'
                }`}
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </form>
          
          {error && (
            <div className="mt-2 text-red-400 text-sm">{error}</div>
          )}
          
          <div className="mt-2 text-xs text-gray-400 text-center">
            Roaster AI can make mistakes. Please verify important information.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface