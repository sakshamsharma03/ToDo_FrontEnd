import React, {useContext, useState} from 'react'
import { Link,Navigate } from 'react-router-dom'
import { Context,server } from '../main'
import toast from "react-hot-toast";
import axios from "axios";



const Login = () => {

const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");  

const submitHandler=async (e)=>
  {
    e.preventDefault(); 
    setLoading(true);
   try {
    const {data}=await axios.post(`${server}/users/login`,{
      email,password,
    },{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true,
    });
    toast.success(data.message);
    setIsAuthenticated(true);
    setLoading(false);
   } catch (error) {
    toast.error(error.response.data.message);
    setIsAuthenticated(false);
    setLoading(false);
   }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
        <input type="email" value={email} onChange={(e)=>
         setEmail(e.target.value) }  placeholder='Email' required />
        <input type="password" value={password} onChange={(e)=>
         setPassword(e.target.value) }placeholder='Password' required />
          <button type="submit" disabled={loading} >Login</button>
          <h4>Or</h4>
          <Link to="/register" >Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login;