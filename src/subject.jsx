import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './subject.css';
import List1 from "./list";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import HighlightIcon from '@mui/icons-material/Highlight';
import Fab from '@mui/material/Fab';
function Subject() {
  const [inputs, setinputs] = useState({
    title: "",
    subject: "",
    content: ""
  });

  const [isexpanded, setisexpanded] = useState(false);

 
  function setinputvalues(event) {
    const inputname = event.target.name;
    const inputvalue = event.target.value;
    setinputs((pre) => ({
      ...pre,
      [inputname]: inputvalue
    }));
  }

  async function addarray() {
    try{
      const result = await axios.post("http://localhost:5000/api/data", inputs);
      console.log(result.data);

    }
    catch(error){
      console.error("Error", error);
    }
    


    setinputs({
      title: "",
      subject: "",
      content: ""
    });
  }
function deleteitems(id) {
  setarrayinput((prev) => 
    prev.filter((elements, index) => index !== id)
  );
}
function expanded(){
  setisexpanded(true)
}
const arrayinput = [{
  title: "hello",
  subject: "english",
  content: "salkjf adkl "
}]


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
            onClick={addarray}
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

        {arrayinput.map((values, index) => (
          <List1
            key={index}
            id={index}
            title={values.title}
            subject={values.subject}
            content={values.content}
            ondelete={deleteitems}
          />
        ))}
      </div>
    </div>
  );
}

export default Subject;
