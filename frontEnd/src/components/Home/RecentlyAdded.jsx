import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-recent-books"
        );
       
        setData(response.data.data);
       
      } catch (err) {
        console.log("error in fetching recently added books", err);
      }
    };
    fetch();
  }, [setData]);
  return (
    <div className="mt-8 ">
      
      <h4
  className="text-4xl font-semibold mt-16 text-center text-yellow-100 pb-4 pt-4"
  style={{
    boxShadow: "0 30px 20px -10px rgba(34, 197, 94, 0.4), 0 40px 60px rgba(34, 197, 94, 0.2)",
    
  }}
>
  Recently added books
</h4>
      {!Data&& <div className="flex items-center justify-center"><Loader/>
      </div>}
      <div className=" h-full  ml-20 mr-16 mt-20 pb-28 flex flex-wrap gap-20 flex-grow ">
       
        {Data && Data.map((items, i)=><div key ={i}><BookCard data ={items} /></div>)}
      </div>
    </div>
  );
};

export default RecentlyAdded;
