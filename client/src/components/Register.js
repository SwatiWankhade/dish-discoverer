import React, { useState } from "react";
import Form from "./Form";
import axios from 'axios';

const Register = ()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    
    const onSubmit = async(e)=>{
        e.preventDefault();
        try{
           await axios.post("http://localhost:3001/auth/register",{
             username,
             password,
           });
           alert("Registration is completed! Now Login.");
           setUsername("");
           setPassword("");
        }catch(err){
            console.log(err);
        }
    }
    return(
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit} />
    )
    
}

export default Register;