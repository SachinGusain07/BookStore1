import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authActions } from "../../store/Authn";
import axios from "axios";
import toast from 'react-hot-toast';
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

const SideBar = (data) => {
  const dispatch = useDispatch();
  const [bg, setBg] = useState(false);
  const [Loader , setLoader] = useState(false);

  const imageUrl = `http://localhost:3000${data.data.avatar}`;

  const LogoutHandle = async () => {
    try {
      setLoader(true);
      const logout = await axios.post(
        "http://localhost:3000/api/v1/logout",
        {},
        { withCredentials: true } // Ensure cookies are included
      );
      console.log(logout);
      toast.success(logout.data.message);
      dispatch(authActions.logout());
      localStorage.removeItem("Book_user");
      setLoader(false);
    } catch (err) {
      console.log("error in logout", err);
      toast.error(err.response?.data?.message || "Error logging out");
    }
  };

  return (
    <div className="bg-zinc-800 h-full p-4 rounded text-white flex flex-col items-center justify-between">
      <div className="flex items-center flex-col justify-center">
        <img src={imageUrl} className="h-[12vh] rounded-full" alt="User Avatar" />
        <p className="mt-3 text-normal text-zinc-100 font-semibold">{data.data.username}</p>
        <p className="mt-1 text-center text-normal text-zinc-300">{data.data.email}</p>
      </div>

      <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>

      <div className="w-full flex-col items-center justify-center text-center hidden lg:flex">
        <Link to='/profile' className="text-zinc-300 font-semibold items-center w-full py-2 hover:bg-zinc-900 rounded transition-all duration-300">Favorites</Link>
        <Link to='/profile/orderHistory' className="text-zinc-300 font-semibold items-center w-full py-2 mt-3 hover:bg-zinc-900 rounded transition-all duration-300">Order History</Link>
        <Link to='/profile/settings' className="text-zinc-300 font-semibold items-center w-full py-2 mt-3 hover:bg-zinc-900 rounded transition-all duration-300">Settings</Link>
      </div>

      <Link to ={'/login'}
        className={`px-2 flex gap-2 justify-center py-1 border-2 hover:border-red-800 rounded hover:bg-zinc-950 text-lg text-white transition-colors  border-red-950 hover:scale-105 duration-700 ${bg ? 'bg-zinc-950' : ''}`}
        onMouseEnter={() => setBg(true)}
        onMouseLeave={() => setBg(false)}
        onClick={LogoutHandle}
      > {Loader? <Loader className=" flex justify-center h-screen w-full" /> : (<> Logout <MdLogout className={`text-xl mt-1 ${bg ? 'text-red-800' : 'text-white'}`} /></>)}
       
      </Link>
    </div>
  );
};

export default SideBar;
