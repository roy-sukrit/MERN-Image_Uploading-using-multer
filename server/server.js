//&1. <------------Dependencies-------------->
const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
//Environment Variable
require('dotenv').config()

app.use(cors());
app.use(express.json())

app.use(express.static('./uploads'))


//^2. <------------------MONGODB CONNECTION-------------------->
const uri=process.env.COMPASS_URI;
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => console.log("Mongo DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERR", err));



//&3. <------------------NODE JS SERVER-------------------------->
const port=process.env.PORT|| 8080
app.listen(port,()=>{
    console.log(`Server is Running on Port : ${port}`)
})

const imageRouter=require('./routes/imageRouter')
app.use('/images',imageRouter)


//&3. <--------------------------End---------------------------->