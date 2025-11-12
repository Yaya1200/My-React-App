import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './subject.css';
import List1 from "./list";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import HighlightIcon from '@mui/icons-material/Highlight';
import Fab from '@mui/material/Fab';
import axios from "axios";
function Subject() {
  const [inputs, setinputs] = useState({
    title: "",
    subject: "",
    content: ""
  });
  const [arrayinput, setarrayinput] = useState([])
  const [isexpanded, setisexpanded] = useState(false);
 
  function setinputvalues(event) {
    const inputname = event.target.name;
    const inputvalue = event.target.value;
    setinputs((pre) => ({
      ...pre,
      [inputname]: inputvalue
    }));
  } 
  useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5000/api/data");
      setarrayinput(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchData();
}, []);


   async function addarray() {
    try{
      const result = await axios.post("http://localhost:5000/api/data", inputs);
    setinputs({
      title: "",
      subject: "",
      content: ""
    });}
     catch(error){
      console.error("Error", error);
    }
  }
  function addtoarray(){
     setarrayinput(prev=>([...prev, inputs]));
  }
 async function deleteitems(id, id1) {
   try{
    await axios.delete(`http://localhost:5000/api/data/${id1}`)
  setarrayinput((prev) => 
    prev.filter((elements, index) => index !== id)
  );
  console.log(id);
}
  catch(error){
    console.error("Error", error);
  }
}
function expanded(){
  setisexpanded(true)
}
function handler(){
  addarray(); addtoarray();
}



  return (
    <div className="p-3 mb-2 min-vh-100 bg-warning-subtle text-warning-emphasis">
     
      <div className="col-md-10">
        <div className="font-monospace mb-3" style={{ width: '6rem' }}><HighlightIcon/>notes</div>

        <div className="col-12 col-md-6">

               <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="subjectInput"
              placeholder="Subject"
              name="subject"
              value={inputs.subject}
              onChange={setinputvalues}
              onClick={expanded}
            />
           <label htmlFor="subjectInput">Subject</label>
          </div>
       
          { isexpanded && <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="titleInput"
              placeholder="Title"
              name="title"
              value={inputs.title}
              onChange={setinputvalues}
            />
            <label htmlFor="titleInput">Title</label>
          </div>}

        
     

         {isexpanded && <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Content"
              id="contentInput"
              style={{ height: '100px' }}
              name="content"
              value={inputs.content}
              onChange={setinputvalues}
            ></textarea>
            <label htmlFor="contentInput">Content</label>
          </div>}

         <Zoom in={isexpanded}> 
          <button
            onClick={handler}
            type="button"
            className="btn btn-outline-info d-block ms-auto">
            < AddIcon />
          </button>
          </Zoom>
        </div>
      </div>


      <div style={{ 
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  Width: "600px"  
}}>

       {arrayinput.map((values, index) => {
  const id1 = values._id ? values._id : null;

  return (
    <List1
      key={id1 || index} 
      id={index}
      id1={id1}
      title={values.title}
      subject={values.subject}
      content={values.content}
      ondelete={deleteitems}
    />
  );
})}

      </div>
    </div>
  );
}

export default Subject;
