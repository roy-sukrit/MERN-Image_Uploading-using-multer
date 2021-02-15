const express = require('express');
const router=express.Router();
const Images=require('../models/model')
const multer=require('multer');
const uuid=require('uuid').v4;
const path = require('path');
const files=[];
const fileInArray=[]

//~<--------------------STORAGE for IMAGE------------------>


//^   DESTINATION & STORAGE -------->  !   ORIGINAL FILENAME

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        let filePath=[];
        console.log("MULTER ENTRY ",file.originalname)
        console.log("files",req.files)
        
        const ext = path.extname(file.originalname);
        const id = uuid();
        filePath = `${id}${ext}`;
        fileInArray.push([(filePath)])  
        console.log("IN ARRAY ",filePath)        
        files.push(fileInArray)
        console.log("PUSHED MAIN ARRAY", fileInArray)    
        cb(null,filePath)       
        console.log("current length",files.length)
    }
    
    
})



const upload=multer({
    
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    storage:storage,
})





//^<---------------Get images--------------------->

router.get('/',(req,res)=>{
    Images.find()
    .then((img)=>{console.log(img);res.json(img);})
    .then(console.log("GET request "))
    .catch(err=>{res.status(400).json(`Error: ${err}`)})
})

//^<---------------Post images--------------------->

router.post('/add',upload.array("uploaded_Image",5),(req,res)=>{
    console.log("Files",fileInArray)
     const newImage=new Images({
     name:req.body.name,
     uploaded_Image:fileInArray

  })    

newImage.save()
.then(()=>{res.json("Article Post Success!") ; })
.then(console.log("New Article POST success") )
.catch(err=>console.log(`Error: ${err}`));
  console.log("AFTER MONGO")

  files.length=0
  fileInArray.length=0
 
})

module.exports = router ;