import React from "react";
import { Link } from "react-router-dom";

import { useSelector , useDispatch } from 'react-redux';
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import { toggleRotate } from "../store/Login_signup";


const LogInSignUp = () => {

  const IsRotate = useSelector((state) => state.login_signup.IsRotate);
 
  const dispatch = useDispatch();

   

  const Flip = () => {
    dispatch(toggleRotate());
  };
  return (
    <div
      className="bg-zinc-900  text-black h-screen flex
    justify-center items-center"
      style={{
        perspective: "400px",

        // Adds depth for 3D rotation
      }}
    >
      <div
        className={` bg-zinc-800 hover:scale-105 duration-1000 shadow-lg hover:shadow-blue-800 rounded-lg w-9/12 lg:w-1/4   text-slate-200 p-4`}
        style={{
          transform: IsRotate ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {!IsRotate ? (
          <SignUp handleClick={Flip} />
        ) : (
            <Login handleClick={Flip} />
        )}
      </div>
    </div>
  );
};

export default LogInSignUp;
