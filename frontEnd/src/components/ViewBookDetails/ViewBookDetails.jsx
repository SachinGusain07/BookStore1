import React from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useEffect , useState } from "react";
import { GrLanguage } from "react-icons/gr";



const ViewBookDetails = () => {
    const {id} = useParams();
    const [Data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/get-book-by-id/${id}`
        );
        
        setData(response.data.data);
        setIsLoading(false);
        
        

      } catch (err) {
        console.log("error in fetching book data", err);
      }
    };
    fetch();
  }, [ ]);
    const imageUrl = `http://localhost:3000/images/${Data.url}`;
    console.log(imageUrl);

  
  
  
  

  return (<>
      {!isLoading ? (
    <div className="px-4 lg:px-12 py-4 lg:py-8 flex flex-col items-center justify-center bg-zinc-900 lg:flex-row lg:justify-normal lg:items-start gap-4 lg:gap-8 h-screen">
      
        <div className ="bg-zinc-800 rounded p-4 h-[40vh] lg:h-[88vh] w-full lg:w-2/4 items-center flex justify-center mt-2">
      
         <img src = {imageUrl} className=" h-[34vh] lg:h-[70vh] lg:w-3/4 rounded-lg" alt="book"  />
       
        
        </div>
       
    
        <div className="py-2 lg:text-sm text-2xl lg:py-4">
            <h1 className="text-2xl font-semibold text-white"><span className ="md:text-3xl text-slate-400">TITLE : </span> {Data.title}</h1>
            <p className="text-zinc-400 font-semibold mt-1">Written by : {Data.author}</p>
            <p className="text-zinc-200  font-semibold mt-4"> <span className = "text-slate-300"> Description : </span><h3 className = "text-slate-500">{Data.desc}</h3></p>
            <p className="text-zinc-500 flex  gap-2  font-semibold mt-1"> 
              <GrLanguage className ="mt-1" /> {Data.language}</p>
            <p className="text-zinc-200 font-semibold mt-1">Price : ${Data.price}</p>
          
        </div> 

    </div>
     ) : (
    <Loader />
  )}


    </>
  )
}

export default ViewBookDetails
