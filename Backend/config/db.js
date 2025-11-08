const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async (req,res) =>{
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Databse connected successfully")
    })
    .catch((err)=>{
        console.log("Issue in DB connection!")
        console.error(err)
    })
}

module.exports = connectDB