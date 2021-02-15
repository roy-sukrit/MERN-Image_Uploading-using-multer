const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const imageSchema= new Schema({
    name:{type:String,required:true},
    uploaded_Image:{
        type:[[String]],
        required:true
    }});

const Images=mongoose.model("Images",imageSchema);
module.exports=Images;