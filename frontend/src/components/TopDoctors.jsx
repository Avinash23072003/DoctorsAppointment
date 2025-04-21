import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import AppContextProvider, { AppContext } from "../context/AppContext.jsx";

const TopDoctors = () => {
    const navigate=useNavigate();
    const {doctors}=useContext(AppContext)
  return (
    <div className="flex flex-col items-center gap-6 my-16 text-gray-900 mx-5 md:mx-10">
      <h1 className="text-3xl font-semibold text-center">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, pariatur?
      </p>

      {/* Doctor Grid (5 per row on large screens) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={()=>{navigate(`/appointments/${item._id}`); scrollTo(0,0)}}
            key={index}
            className="flex flex-col border border-blue-200 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 shadow-md"
          >
            {/* Doctor Image */}
            <img
              className="w-full aspect-[5/2] min-h-[160px] object-cover bg-blue-200"
              src={item.image}
              alt={item.name}
            />

            {/* Doctor Details */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <p>Available</p>
              </div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer" onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}>
        More
      </button>
    </div>
  );
};

export default TopDoctors;
