const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const {geminiWrapper , getHistory , getChat} = require('./controllers/gemini.js')
const connectDB = require('./config/db.js')

//Middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : true}))

//Routes
app.use('/api/route' , geminiWrapper)
app.use('/api/history' , getHistory)
app.get('/api/chat' , getChat)
//Database connection
connectDB()

app.get('/' , (req,res)=>{
    res.send('Server is running')
})

port = process.env.PORT || 5001 
app.listen(port , ()=>{
    console.log(`Server is listening at ${port}`)
})