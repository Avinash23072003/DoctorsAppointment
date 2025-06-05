import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'
const Sidebar = () => {

    const {aToken}=useContext(AdminContext)
    const {dToken}=useContext(DoctorContext)
  return (
    <div className="p-2 min-h-screen bg-white border-r shadow-lg">
        {
            aToken && <ul className="text-[#515151] mt-5">
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-200 border-r-4 border-blue-400':''}`} to={'/admin-dashboard'}>
                <img src={assets.home_icon} />
                <p className="hidden md:block">DashBoard</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-200 border-r-4 border-blue-400':''}`} to='/all-appointments'>
                <img src={assets.appointment_icon} />
                <p className="hidden md:block">Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-200 border-r-4 border-blue-400':''}`} to='/add-doctor'>
                <img src={assets. add_icon} />
                <p className="hidden md:block">Add Doctor</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-200 border-r-4 border-blue-400':''}`} to='/doctor-list'>
                <img src={assets.people_icon} />
                <p className="hidden md:block">Doctors List</p>
            </NavLink>

            
            </ul>
        }


        {
            dToken && <ul className="text-[#515151] mt-5">
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-200 border-r-4 border-blue-400':''}`} to={'/doctor-dashboard'}>
                <img src={assets.home_icon} />
                <p className="hidden md:block">DashBoard</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-200 border-r-4 border-blue-400':''}`} to='/doctor-appointment'>
                <img src={assets.appointment_icon} />
                <p className="hidden md:block">Appointments</p>
            </NavLink>


            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-200 border-r-4 border-blue-400':''}`} to='/doctor-profile'>
                <img src={assets.people_icon} />
                <p className="hidden md:block">Profile</p>
            </NavLink>

            
            </ul>
        }
    </div>
  )
}

export default Sidebar