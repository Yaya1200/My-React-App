import "./account.css";
import React,{useState} from "react";
import Subject from "./subject";


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
  function login(){
    
    return <Subject/>
  }
  return (

    <div>
    <h1 style={{textAlign:"center", position: "relative"}}>smart study</h1>
   <form className="form-container" onSubmit={login}>
    <h1>Login Now </h1>
    <input type="text" name="username" onChange={inputs} placeholder="username" value = {value.username}/>
    <br />
    <input type="password" name="password" onChange={inputs} placeholder="password" value = {value.password}/>
    <br />
    <label>
      <button className="login-using-password" type="submit" onClick={login}>Login</button>
      </label>
    <label>
    <button className="login-using-google" type="submit" onClick={login}>
      <img src="./images/googlesvg.svg" style={{ width: "20px", marginRight: "8px", }} />
  Login 
</button>

    </label>
    <label>
     <a>Create Account</a>
    </label>
   
  
  </form>
  </div>)};

export default Access;
