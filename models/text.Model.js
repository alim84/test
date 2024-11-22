const mongoose=require('mongoose')


let textSchema= new mongoose.Schema({
    text:{
        type: String,
    }
})
module.exports=mongoose.model("Texting", textSchema)