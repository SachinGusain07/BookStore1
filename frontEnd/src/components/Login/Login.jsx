import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import Loader from '../Loader/Loader'
const Login = ({handleClick}) => {
  const navigate = useNavigate();

  const [IsLoading, setIsLoading] = useState(false);

  const [Data, setData] = useState({
    username : "",
    password : "",
  })


  
  const handleChange = async () => {
     
 try{   
  if (Data.username === "" || Data.password === "") {
      toast.error("Please fill all the fields");
      return;
  } 
  else {
    setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/sign-in", Data , {
        withCredentials: true , 
      } );


      const toShow = `Welcome ${response.data.username}`;
      const Book_user = JSON.stringify(response.data) 
      localStorage.setItem("Book_user ", Book_user)
      toast.success(toShow);
      console.log(response);
      console.log(response.headers.jwt);
      setIsLoading(false);
      console.log(document.cookie);
      console.log(document.cookies);
      
      navigate("/");
    }}catch(err) {
      console.log("error in login", err);
      toast.error(err.response.data.message);
    }
  }


  return (

    <div className='flex flex-col gap-0' style={{
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
    }}>
      
      <h2 className="mt-2">Login</h2>

     
      <label htmlFor ="Username" className='mt-4'>Username</label>
      <input type = "text" name = "Username" id ="Username" placeholder =" Username"  className='w-full h-9 bg-zinc-950 rounded-sm'
      value = {Data.username}
      onChange={(e)=>setData ({ ...Data, username: e.target.value })}></input>

        <label htmlFor ="password "className='mt-4'>Password</label>
      <input type = "password" name ="password" id ="password" placeholder=' Password' className='w-full h-9  bg-zinc-950' 
      value = {Data.password}
      onChange={(e)=>setData ({ ...Data, password: e.target.value })}></input>

      <Link className= "mt-10 hover:bg-blue-800 flex justify-center items-center border-blue-600 border rounded text-center pt-1 pb-1"
      onClick={handleChange} > {IsLoading ?<Loader isButtonLoader = {true}/> : 'LogIn'}</Link>
      <h3 className=' mt-2 text-center'>Or</h3>

      

     
      <Link to ={'/SignUp'} className='mt-2 text-zinc-400 text-center'> Don't have an Account?<span onClick={handleClick} className="text-slate-200 hover:text-blue-300
        active:text-green-300  underline"> SignUp</span></Link>

    </div>
  )
}


export default Login
