import React, { useState} from "react";
import "./App.css";
import Axios from "axios";
import {Slider} from './Slider'



function App() {
  const [file, setFile] = useState(null);
  const[name,setName]=useState('')
 

  const upload= e =>{
    e.preventDefault()
  const data =new FormData();

   data.append("name",name)
  for(var x = 0; x<file.length; x++) {
    data.append('uploaded_Image', file[x])
}
    Axios.post('http://localhost:8080/images/add',data)
   .then((res)=>{console.log(res);setFile('');setName(''); window.location.reload() })
   .catch(err=>console.log(err));

   
  }

  return (
  
    <div className="App">
  <div className="jumbotron">
  
  <h1><b>MERN Image Uploading!</b></h1> 

  <form onSubmit={upload} encType="multipart/form-data" >
  <div className="form-group">  
  <input type="text"  placeholder="Name" value={name} required
   onChange={e=>{setName(e.target.value)}}
   className="form-control"/>
   </div>

   <div className="form-group">
    <input type="file" multiple required filename="uploaded_Image"
     className="form-control-file" 
    onChange={e => {setFile(e.target.files);
  }}/>
</div>

  <button 
  type="submit" 
  variant="primary"
   size="lg">
   Upload!
   </button>      
  </form>
</div>


<Slider/>      
</div>
    
    
  );


  
}



export default App;