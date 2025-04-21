import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx';
const MyAppointments = () => {
  const {doctors}=useContext(AppContext)
  return (
    <div classname="p-10">
      <p className="pt-24 text-center text-2xl">My Appointment</p>
      
      {
        doctors.slice(0,2).map((item,index)=>(
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
           <img className="w-32 bg-indigo-200" src={item.image}/>
          </div>
          <div className="flex-1 text-zinc-600">
            <p>{item.name}</p>
            <p>{item.speciality}</p>
            <p>Adress</p>
            <p>{item.address.line1}</p>
            <p>{item.address.line2}</p>
            <p>time 23 aug 2 9-10 AM</p>
          </div>


         <div className="flex flex-col gap-6 justify-end">
          <button className="text-sm text-white text-center sm:min-w-48 py-2 border rounded-2xl bg-blue-500">Pay Online</button>
          <button className="text-sm text-white  text-center sm:min-w-48 py-2 border rounded-2xl bg-blue-500">Cancel Appointment</button>
          </div>
          </div>
         
        ))
      }
      </div>
  
  )
}

export default MyAppointments