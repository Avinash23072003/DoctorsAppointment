import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col gap-4  text-gray-600 items-center py-16">
          <h1 className="text-3xl font-medium">Find By Speciality</h1>
          <p className="sm:w-1/3 text-center text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem enim iste iusto magnam!</p>
          <div className="flex sm:justify-center w-full gap-5 pt-5 overflow-scroll">
            {specialityData.map((item,index)=>(
                  <Link onClick={()=>scrollTo(0,0)}className="flex flex-col items-center text-s cursor-pointer flex-shrink -0 hover:translate-y-[-10px] transition-all duration-500"key={index} to={`/doctors/${item.speciality}`}>
                    <img className="w-16 sm:w-24 mb-2 "src={item.image} />
                    <p>{item.speciality}</p>
                  </Link>
            ))}
          </div>
    </div>
  )
}

export default SpecialityMenu