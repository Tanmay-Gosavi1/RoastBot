import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../authent/Authe'
import ReactMarkDown from 'react-markdown'

const Root = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [prevRes , setPrevRes] = useState([])
  const [historyVisible , setHistoryVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResponse('')

    try {
      const res = await axios.post('http://localhost:5000/api/route', { prompt })
      setResponse(res.data.generatedText)
    } catch (error) {
      console.error('Error fetching response:', error)
      setResponse('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const getHistory = async () =>{
    try {
      setHistoryVisible(prev => !prev)
      const res = await axios.get('http://localhost:5000/api/history')
      setPrevRes(res.data.history)
    } catch (error) {
      console.log("Error in fetching history" , error)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-6 relative">
      <div className='absolute right-0 top-0'>
        <Auth />
      </div>
      <header className="w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Roaster AI
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700 backdrop-blur-md"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your creative prompt..."
            rows="5"
            className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200 resize-none"
          />
          <button
            type="submit"
            disabled={loading || !prompt}
            className={`mt-4 w-full py-3 rounded-xl font-semibold transition duration-300  ${
              (loading || !prompt)
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer'
            } 
            `}
          >
            {loading ? 'Generating...' : '✨ Generate Response'}
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700 backdrop-blur-md">
            <h3 className="text-xl font-bold mb-3 text-purple-400">AI Response:</h3>
            <pre className="whitespace-pre-wrap text-gray-200"><ReactMarkDown>{response}</ReactMarkDown></pre>
          </div>
        )}

        <div className='flex justify-center'>
          <button onClick={()=>getHistory()} className='px-3 py-2 bg-fuchsia-500 text-white font-bold my-3 rounded-lg cursor-pointer'>
             {historyVisible ? "Hide History" :"Show History"}
          </button>
        </div>
        {historyVisible && (
          <div className="mt-6 bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700 backdrop-blur-md">
            <h3 className="text-xl font-bold mb-3 text-purple-400">History:</h3>
            {
              prevRes.map((hist,idx) =>{
                return <pre key={idx} className="whitespace-pre-wrap text-gray-200">{idx+1}. {hist.prompt}</pre>
              })
            }
          </div>
        )}
      </header>
    </div>
  )
}

export default Root
