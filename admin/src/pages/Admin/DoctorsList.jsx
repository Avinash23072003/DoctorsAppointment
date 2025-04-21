import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors ,changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Doctors</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="group border border-gray-300 p-4 rounded-lg w-full sm:w-[48%] md:w-[30%] lg:w-[23%] max-w-sm transition-all duration-300"
          >
            {/* Image wrapper for hover background */}
          
              <img
                src={doctor.image}
                alt={doctor.name}
                className=" bg-indigo-50 group-hover:bg-blue-400  transition-all duration-500 w-full h-48 object-cover rounded-lg"
              />
           

            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p>{doctor.speciality}</p>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={doctor.available}
                readOnly
                className="w-4 h-4"
                onChange={()=>changeAvailability(doctor._id)}
              />
              <label className="text-sm">Available</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
