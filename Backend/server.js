const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const {geminiWrapper , getHistory} = require('./controllers/gemini.js')
const connectDB = require('./config/db.js')

//Middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : true}))

//Routes
app.use('/api/route' , geminiWrapper)
app.use('/api/history' , getHistory)
//Database connection
connectDB()

port = process.env.PORT || 5001 
app.listen(port , ()=>{
    console.log(`Server is listening at ${port}`)
})