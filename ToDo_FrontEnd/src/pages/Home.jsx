import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react'
import { server,Context} from '../main';
import toast from 'react-hot-toast';
import {Navigate} from "react-router-dom";
import TodoItem from '../components/TodoItem';

const Home = ()=> {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [loading,setLoading]=useState(false);
  const [task,setTasks]=useState([]);
  const [refresh,setRefresh]=useState(false);
  const {isAuthenticated}=useContext(Context);
  
  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler=async(e)=>
  {
    e.preventDefault();
    try {
      setLoading(true);
      const {data}=await axios.post(`${server}/task/new`,{
        title,description,
      },
    {withCredentials:true,
    headers:{
      "Content-Type":"application/json",
    },
  });
  setTitle("");
  setDescription("");
  toast.success(data.message);
  setLoading(false);
    } catch (error) {
      toast.error(error.response.data.meassage);
      setLoading(false);

    }
  }

  useEffect(()=>
{
  axios.get(`${server}/task/my`,{
    withCredentials:true,
  }).then((res)=>
{
  setTasks(res.data.Task);
}).catch((e)=>{
  toast.error(e.response.data.message);
})
},[refresh]);
if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
        <input type="text" value={title} onChange={(e)=>
         setTitle(e.target.value) }  placeholder='Title' required />
        <input type="password" value={description} onChange={(e)=>
         setDescription(e.target.value) }placeholder='Description' required />
          <button type="submit" disabled={loading} >Add Task</button>
        
        </form>
      </section>
    </div>
      <section className="todosContainer">
        {
          task.map((i)=>
        <TodoItem title={i.title} 
        description={i.description} 
        isCompleted={i.isCompleted}
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
        id={i._id}
        key={i._id}
        />
        )
        }
      </section>
    </div>
  );
};

export default Home;

