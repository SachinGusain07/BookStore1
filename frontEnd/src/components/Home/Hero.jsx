import React from 'react'
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div className=" h-screen lg:h-screen item-center justify-center flex flex-col lg:flex-row relative ">

      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col align-middle justify-center p-8 lg:p-20 text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold text-white">Discover your next great Read</h1>
        <p className="text-xl text-zinc-300 mt-4">
          Uncover captivating stories that ignite your curiosity, enriching your knowledge and endless inspiration in our curated collection of books.
        </p>
        <Link to="/all-books" className="text-yellow-100 font-semibold border-yellow-400 py-2 mt-4 hover:bg-yellow-200  hover:text-black hover:shadow-2xl hover:shadow-green-300 rounded-full shadow-xl border border-b-2 shadow-zinc-800 lg:w-80 w-30 duration-1000 lg:text-2xl text-xl text-center">
          Discover Books
        </Link>
      </div>

      {/* Image Section */}
      <div className="bg-black lg:w-1/2   content-end h-auto ">
        <img
          src="./bgpng1.png"
          alt="hero"
          className="object-cover w-full h-auto  lg:rounded-none rounded-b-lg "
        />
      </div>

    </div>
  )
}

export default Hero
