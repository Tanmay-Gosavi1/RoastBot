import React from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { FaRocket, FaBrain, FaLightbulb, FaComments, FaArrowRight, FaStar } from 'react-icons/fa'
import { useEffect } from 'react'
import axios from 'axios'

const Landing = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <FaBrain className="text-3xl text-purple-400" />,
      title: "Get Roasted",
      description: "Creative replies. Sharp insults. Shockingly accurate observations. This is roasting… upgraded."
    },
    {
      icon: <FaLightbulb className="text-3xl text-yellow-400" />,
      title: "Try the Heat",
      description: "Why get therapy when you can get roasted by an AI that actually understands where you messed up?"
    },
    {
      icon: <FaComments className="text-3xl text-blue-400" />,
      title: "Enter the Fire",
      description: "Experience human-like conversations with context awareness and emotional intelligence."
    },
    {
      icon: <FaRocket className="text-3xl text-green-400" />,
      title: "Lightning Fast Responses",
      description: "Get instant responses with our optimized AI infrastructure for seamless interactions."
    }
  ]

  useEffect(()=>{
    const startServer = async()=>{
      try{
        await axios.get(import.meta.env.VITE_API_URL + '/');
        console.log("Server is running")
      }catch(err){
        console.log(err)
      }
    } 
    startServer()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.02),transparent),radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.02),transparent)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.01)_50%,transparent_70%)]"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to='/' className="text-2xl hover:scale-105 font-bold bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent">
              Roaster AI
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              The AI That Roasts 
              <span className="block bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent">
                You Into Self-Reflection
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              This AI doesn’t sugarcoat. It burns. Bring your questions, your dilemmas, or your attitude… and get cooked on demand.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate('/chat')}
              className="group bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-gray-900/50"
            >
              <span>Get Started</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-gray-600 hover:border-gray-400 bg-gradient-to-r from-gray-900/50 to-black/50 hover:from-gray-800/50 hover:to-gray-900/50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
              Watch It Cook
            </button>
          </div>

          {/* Features Grid */}
          <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-gradient-to-br hover:from-gray-800/60 hover:via-gray-900/40 hover:to-gray-800/60 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 mb-20 shadow-2xl">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Trusted by Thousands</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-2">10k+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-2">1M+</div>
                <div className="text-gray-400">Messages Generated</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <div className="text-gray-400">5-Star Rating</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent"><span className="text-red-500/90">Warning </span>: This AI Has No Chill</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Roast replies. Brutal honesty. Zero filters. Use at your own risk.
            </p>
            <button
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 border border-gray-600 hover:border-gray-500 px-10 py-4 rounded-full font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gray-900/50"
            >
              Start Chatting Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 px-6 py-8 mt-20 bg-gradient-to-r from-black/50 to-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2024 Roaster AI. All rights reserved. Built with ❤️ By Tanmay Gosavi.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing