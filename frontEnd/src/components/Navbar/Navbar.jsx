import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { MdOutlineSegment } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../../store/Login_signup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authActions } from '../../store/Authn';
import { CgProfile } from "react-icons/cg";



const Navbar = () => {
  const dispatch = useDispatch();
  const reduxIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Local isLoggedIn state to control the UI
  const [isLoggedIn, setIsLoggedIn] = useState(reduxIsLoggedIn);

  

  // Synchronize local isLoggedIn with Redux state
  useEffect(() => {
    setIsLoggedIn(reduxIsLoggedIn);
  }, [reduxIsLoggedIn]);

  const handleLogin = useCallback(() => {
    dispatch(login());
     // Update local state on login
  }, [dispatch]);

 const handleSignup = useCallback(() => {
    dispatch(signup());
   // Update local state on signup
  }, [dispatch]);


  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/Cart" },
    { title: "Profile", link: "/Profile" },
  ];

  if (!isLoggedIn) {
    links.splice(2, 2); // Remove Cart and Profile links if not logged in
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 flex relative bg-zinc-800 text-white py-3 px-8 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="mr-3 h-10" />
          <h1 className="text-2xl font-semibold">BooksHeaven</h1>
        </Link>

        <div className="nav-link-bookHeaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4 lg:text-2xl text-xs">
            {links.map((item, i) => (
             <React.Fragment key={i}>
             {item.title== "Profile" ? (
               <Link to={item.link} className="hover:text-blue-500 transition-all  duration-500 cursor-pointer" key={i}>
               <CgProfile className=" h-8 w-10"/>
             </Link>
             )
             :      (
              <Link to={item.link} className="hover:text-blue-500 transition-all duration-500 cursor-pointer" key={i}>
              {item.title}
            </Link>
             )}
             </React.Fragment>
            ))}
          </div>

          <div className="hidden md:flex gap-4 flex-col lg:flex-row">
            {!isLoggedIn ? (
              <>
                <Link to="/Login" className="px-2 py-1 border border-blue-500 rounded hover:bg-slate-50 hover:text-zinc-900 transition-colors duration-700" 
                onClick={handleLogin}>
                  Log In
                </Link>
                <Link to="/SignUp" className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-slate-50 hover:text-zinc-900 transition-colors duration-700"
                onClick={handleSignup} >
                  Sign Up
                </Link>
              </>
            ): ''}
          </div>

          <button
            className="lg:hidden md:block text-white text-2xl hover:text-zinc-400 duration-300"
            onClick={() => setMobileNav(prev => (prev === "hidden" ? "block" : "hidden"))}
          >
            <MdOutlineSegment />
          </button>
        </div>
      </nav>

      {/* Responsive mobile menu */}
      <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center gap-5`}>
        {links.map((item, i) => (

          <React.Fragment key={i}>
         {
          
   
          item.title == "Profile" ? ( <Link
            to={item.link}
            className="hover:text-blue-500 hover:bg-white px-2 py-1 text-center flex justify-center transition-all duration-500 cursor-pointer border border-blue-500 rounded text-white text-4xl font-semibold "
            key={i} 
            onClick={() => setMobileNav("hidden")}
          >
            {item.title}
          </Link>
        ): ( <Link
          to={item.link}
          className="hover:text-blue-500 w-full flex justify-center transition-all duration-500 cursor-pointer text-white text-4xl font-semibold"
          key={i}
          onClick={() => setMobileNav("hidden")}
        >
          {item.title}
        </Link>)}
        </React.Fragment>
        ))}
      

        {!isLoggedIn ? (
          <>
            <Link
              to="/Login"
              className="text-white text-4xl font-semibold px-8 pb-3 item-center border border-blue-500 rounded hover:bg-slate-50 hover:text-zinc-900 transition-colors duration-700"
              onClick={() => {
                setMobileNav("hidden");
                handleLogin();
                
              }}
            >
              Log In
            </Link>
            <Link
              to="/SignUp"
              className="text-4xl font-semibold px-8 pb-3 py-1 rounded bg-blue-500 text-black hover:bg-slate-50 hover:text-zinc-900 transition-colors duration-700"
              onClick={() => {
                setMobileNav("hidden");
                handleSignup();

               
              }}
            >

              Sign Up
            </Link>
          </>
        ): ''}
      </div>
    </>
  );
};

export default Navbar;
