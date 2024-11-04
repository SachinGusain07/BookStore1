import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {login} from '../../store/Login_signup'
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';


const SignUp = ({handleClick}) => {
   const dispatch = useDispatch();
  const [Data, setData] = useState({
    username : "",
    email : "",
    password : "",
    address:"",

  });
  
 
    const navigate = useNavigate();
    
     
  
  

  const handleChange =  async (e) => {  
  try { 
    if(Data.username === "" || Data.email === "" || Data.password === "" || Data.address === ""){
      alert("Please fill all the fields");
      return;
    }
    else {
      const response = await axios.post("http://localhost:3000/api/v1/sign-up", Data);
      dispatch(login());
      navigate("/login");
      toast.success(response.data.message);
  }
}
    
    catch(err){
      console.log("error in sign up", err);
      toast.error(err.response.data.message);

      
     

    }
  }
  



  return (
    <div className='flex flex-col gap-0' style={{
      backfaceVisibility: 'hidden'}}>
      <h2>Sign Up</h2>
      
      <label htmlFor ="Username" className='mt-8' >Username</label>
      <input type = "text" required name = "Username" id ="Username" placeholder =" Username"  className='w-full h-9 bg-zinc-950 rounded-sm'
      value = {Data.username}
      onChange ={(e) => setData({...Data, username: e.target.value})}></input>
      
      <label htmlFor ="email" className='mt-4'>Email </label>
      <input type = "email" name = "email" id ="email" required placeholder='Email'  className='w-full h-9  bg-zinc-950'
      value ={Data.email}
      onChange= {(e)=>setData({...Data, email: e.target.value

      })}></input>

        <label htmlFor ="password "className='mt-4'>Password</label>
      <input  type = "password" required name ="password" id ="password" placeholder=' Password' className='w-full h-9  bg-zinc-950'
      value={Data.password}
      onChange={(e)=>setData({...Data, password: e.target.value})} ></input>
     
      <label htmlFor ="address"className='mt-4'>Address</label>
      <textarea required rows="4" 
                   className="w-full bg-zinc-950 rounded-sm resize-y"
                  name="address" placeholder='Address'
                  value ={Data.address}
                  onChange ={(e)=>setData({...Data, address: e.target.value})}>
          
        
        </textarea>
         
        <Link className= "mt-10 hover:bg-blue-800 border-blue-600 border rounded text-center pt-1 pb-1 " onClick={handleChange}>SignUp</Link>
        <h3 className=' mt-2 text-center'>Or</h3>

        <Link to ={'/login'} className='mt-2 text-zinc-400 text-center'> Already have an Account ?  <span onClick={handleClick} className="text-slate-200 hover:text-blue-300
        active:text-green-300  underline">Login</span></Link>
        
       
     </div>
  )
}

export default SignUp
