import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext)
    const navigate=useNavigate();
    const  logOut=()=>{
        navigate('/')
       aToken && setAToken('')

       aToken && localStorage.removeItem('aToken')
    }
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-4 sm:px-10 py-4 border-b bg-white shadow-md">
    <div className="flex items-center gap-3">
      <img
        src={assets.admin_logo}
        alt="Logo"

      />
      <p className="text-sm sm:text-base text-white border-s-violet-300 rounded-3xl bg-blue-500 w-20 py-1 text-center">
        {aToken ? 'Admin' : 'Doctor'}
      </p>
    </div>
  
    <button
      className="bg-blue-500 hover:bg-red-600 text-white text-sm sm:text-base py-1.5 px-6 rounded-3xl transition duration-200 w-full sm:w-auto"
    onClick={logOut}
    >
      LogOut
    </button>
  </div>
  
  )
}

export default Navbar