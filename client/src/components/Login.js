import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const [_, setCookies] = useCookies(["access_token"]);
const navigate = useNavigate();

const onSubmit = async (e)=>{
   e.preventDefault();

   try{
     const response = await axios.post("http://localhost:3001/auth/login",{
        username,
        password,
     });
     console.log(response.data)
     if(response.data.message!="User not found ! "){
        console.log(response.data)
         setCookies("access_token",response.data.token);
         window.localStorage.setItem("userID",response.data.userId);
        //  window.location.pathname="/";
        navigate("/");
     }
   }catch(err){
    console.log("hello");
   }
}

    return(
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>
    )
}

export default Login;