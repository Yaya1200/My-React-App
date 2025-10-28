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
  function login(event){
    event.preventDefault();
    if(value.username === "yared" && value.password === "12345678"){
        setnewpage(true)
      }
    else{
      alert("please enter the correct username and password")
    }
  }
  if (newpage){
    return <Subject/>
  }
  return (
    <div>
    <h1 style={{textAlign:"center", position: "relative"}}>smart study</h1>
   <form className="form-container" onSubmit={login}>
    <h1>Login </h1>
    <input type="text" name="username" onChange={inputs} placeholder="username" value = {value.username}/>
    <br />
    <input type="password" name="password" onChange={inputs} placeholder="password" value = {value.password}/>
    <br />
    <button type="submit" onClick={login}>Login</button>
  </form>
  </div>)};

export default Access;
