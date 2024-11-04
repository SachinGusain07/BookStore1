import React from 'react'
import { Link } from 'react-router-dom'


const BookCard = ({data}) => {
 
  const imageUrl = `http://localhost:3000/images/${data.url}`;
  console.log(imageUrl);
  
  return (
    <>
    <Link to ={`/view-book-details/${data._id}`}>
    <div className='  bg-zinc-800 shadow-md rounded-md p-2 hover:shadow-xl hover:shadow-slate-800 duration-300 ease-linear hover:scale-105'>
        <div className='flex flex-col bg-zinc-900 rounded w-60 items-center justify-center'>
          <img src ={imageUrl} at="/" className = "   h-[25vh] w-full rounded-tr" /> 

          
          </div>
          <h2 className = " mt-4 text-xl  text-white font-semibold ">{data.title}</h2>
          <p className =" text-zinc-400 font-semibold "> by {data.author}</p>
          <p className="text-zinc-200 font-semibold text-xl mt-1"> ${data.price}</p>
      </div>
    
    </Link>
    </>
  )
}

export default BookCard
