import React from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard/BookCard";
const AllBook = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-all-books"
        );

        setData(response.data.data);
      } catch (err) {
        console.log("error in fetching recently added books", err);
      }
    };
    fetch();
  }, [setData]);
  return (
    <div className="pb-20 bg-zinc-800">
      <div className="mt-0 ">
        <h4 className="text-4xl font-semibold text-center text-yellow-100 shadow-green-300 shadow-2xl pb-4 ">
          All Books
        </h4>
        {!Data && (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}
        <div className=" ml-20  mt-10  flex flex-wrap gap-20">
          {Data &&
            Data.map((items, i) => (
              <div key={i}>
                <BookCard data={items} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllBook;
