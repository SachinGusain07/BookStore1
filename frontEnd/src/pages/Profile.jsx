import React, { useEffect } from 'react'
import SideBar from '../components/Profile/SideBar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader/Loader'

const Profile = () => {
  const [Profile , setProfile] = React.useState({});

  useEffect(() => {

    const localData = localStorage.getItem('Book_user');
    const UserData = JSON.parse(localData);
    setProfile(UserData);
   
  }, [])
    
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-11 gap-4'>
      {!Profile ? <Loader/> : 
      <>
        <div className ="w-full md:w-1/6">
         <SideBar data = {Profile}/>
        </div>
      
      <div className ="w-full md:w-5/6">
        <Outlet/>
      </div>

      </>}
    </div>
  )
}

export default Profile
