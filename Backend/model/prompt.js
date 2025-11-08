const mongoose = require('mongoose')

const promptSchema = new mongoose.Schema({
    prompt : {
        type : String ,
        required : true ,
        trim : true
    },
    response : {
        type : String ,
        required :true ,
        trim : true
    }
},{timestamps:true})

module.exports = mongoose.model("Prompt" , promptSchema)