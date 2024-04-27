import {BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import { useContext, useEffect } from "react";
import { server } from "./main";

import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context } from "./main";

function App() {
  const {setUser,setIsAuthenticated,setLoading}=useContext(Context);
  useEffect(()=>
  
{
  setLoading(true);
  axios.get(`${server}/users/me`,
      {withCredentials:true,}).then((res)=>{
        setUser(res.data.user);setIsAuthenticated(true);
        setLoading(false);
      }).catch((error)=>
    {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })
},[])
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App
