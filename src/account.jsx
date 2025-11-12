import "./account.css";
import React,{useState} from "react";
import Subject from "./subject";
import axios from "axios";


function Access() {
  const [value, setvalue] = useState({username:"", password:""})
  const [newpage, setnewpage] = useState(false)
  function inputs(event){
     let inputname = event.target.name;
     let inputvalue = event.target.value;
     setvalue(prevalue=>({
      ...prevalue, 
      [inputname]: inputvalue
     }))
  }
  async function inputaccount(k) {
    k.preventDefault();
    try{
    await axios.post("http://localhost:5000/api/input/account", value);
       setnewpage(true);
    }
    catch(error){
      console.error("error", error);
    }
    
  }

  if(newpage){
    return <Subject/>
  }

  return (

    <div>
    <h1 style={{textAlign:"center", position: "relative"}}>smart study</h1>
   <form className="form-container" onSubmit={inputaccount}>
    <h1>Login Now </h1>
    <input type="text" name="username" onChange={inputs} placeholder="username" value = {value.username}/>
    <br />
    <input type="password" name="password" onChange={inputs} placeholder="password" value = {value.password}/>
    <br />
  
    <button className="login-using-password" type="submit" onClick={inputaccount}>
  Login
</button>

<button className="login-using-google" type="button">
  <img 
    src="/images/googlesvg.svg" 
    alt="Google logo" 
    style={{ width: "20px", marginRight: "8px", verticalAlign: "middle" }} 
  />
  Login 
</button>


  <button className="create-account">Create Account</button>

   
  
  </form>
  </div>)};

export default Access;
