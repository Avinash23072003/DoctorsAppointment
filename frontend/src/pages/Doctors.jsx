import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { AppContext } from '../components/AppContext';
const Doctors = () => {
  const {speciality}=useParams();
  const {doctors}=useContext(AppContext)
  const[fiterDoc,setFilterDoc]=useState([])
  const[filter ,setFilter]=useState(false)
  const navigate=useNavigate();
  console.log(speciality);

  const applyFiter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality==speciality))
    }
    else{
   setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFiter()
  },[doctors,speciality])
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto text-gray-900">
      <p className="mt-20 text-2xl font-semibold text-center mb-6">
        Browse Through Doctor Specialists
      </p>
      
      
      <div className="flex flex-col sm:flex-row   gap-8 ">
      <button 
  onClick={() => setFilter(prev => !prev)} 
  className={`sm:hidden w-24 h-8 rounded-2xl border rounded-1xl text-sm transition-all ${filter ? 'bg-blue-400 text-white' : ''}`}
>
  Filter
</button>

        {/* Speciality List */}
        <div className={` flex flex-col gap-3 text-gray-700 font-medium text-lg ${filter ? 'flex': 'hidden sm:flex'}`}>
          <p onClick={()=>{speciality==='General physician'? navigate('/doctors'): navigate("/doctors/General physician")}} className="p-2 cursor-pointer hover:text-blue-500 transition border border-solid rounded-2xl">General Physician</p>
          <p  onClick={()=>{speciality==='Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')}}className="p-2 cursor-pointer hover:text-blue-500 transition border border-solid rounded-2xl">Gynecologist</p>
          <p  onClick={()=>{speciality==='Dermatologist' ? navigate('/doctors'):navigate('/doctors/Dermatologist')}}className="p-2 cursor-pointer hover:text-blue-500 transition border border-solid rounded-2xl">Dermatologist</p>
          <p onClick={()=>{speciality==='Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')}}className="p-2 cursor-pointer hover:text-blue-500 transition border border-solid rounded-2xl">Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className="p-2 cursor-pointer hover:text-blue-500 transition border border-solid rounded-2xl">Neurologist</p>
          <p onClick={()=>{speciality==='Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}}className="p-2 cursor-pointer hover:text-blue-500 transition border border-solid rounded-2xl">Gastroenterologist</p>
        </div>
  
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {fiterDoc.map((item, index) => (
            <div
              onClick={() =>{ navigate(`/appointments/${item._id}` ) ; scrollTo(0,0)}}
              key={index}
              className="border border-blue-200 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg shadow-md"
            >
              {/* Doctor Image */}
              <img
                className=" w-full aspect-[5/3] object-cover bg-blue-200 "
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
      </div>
    </div>
  );
  
}

export default Doctors