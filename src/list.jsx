import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
function List1(prop){
return(
 <div className="card border-warning mb-3" style={{maxWidth: "18rem"}}>
  <div className="card-header">{prop.subject} </div>
  <div className="card-body">
    <h5 className="card-title">{prop.title}</h5>
    <p className="card-text">{prop.content}</p>
    <button onClick={() => prop.ondelete(prop.id, prop.id1)} className="btn btn-sm ">
          <DeleteIcon style={{color:"rgba(155, 32, 32, 1)"}}/>
        </button>
  </div>
  
  </div>

)
}
export default List1