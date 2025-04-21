import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const navigate=useNavigate();
    const[showMenu,setShowMenu]=useState(false);
   const {token,setToken}=useContext(AppContext)

   const logOut=()=>{
    setToken(false);
    localStorage.removeItem('token')
   }
  return (
    <div className="fixed top-0 left-0 w-screen bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div>
          <img src={assets.logo} alt="Logo" className="h-12 w-auto cursor-pointer" onClick={()=>navigate('/')} />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex  space-x-8">
          <NavLink to="/" className="text-gray-700 font-medium hover:text-blue-500">
            <li>HOME</li>
            <hr className="border-none outline-none h-0.5 bg-blue-400 w-5/5 m-auto hidden"></hr>
          </NavLink>
          <NavLink to="/about" className="text-gray-700 font-medium hover:text-blue-500">
            <li>ABOUT</li>
            
            <hr className="border-none outline-none h-0.5 bg-blue-400  w-5/5 m-auto hidden"></hr>
          </NavLink>
          <NavLink to="/doctors" className="text-gray-700 font-medium hover:text-blue-500">
            <li>ALL DOCTORS</li>
            <hr className="border-none outline-none h-0.5 bg-blue-400  w-5/5 m-auto hidden"></hr>
          </NavLink>
          <NavLink to="/contact" className="text-gray-700 font-medium hover:text-blue-500">
            <li>CONTACT</li>
            <hr className="border-none outline-none h-0.5 bg-blue-400  w-5/5 m-auto hidden"></hr>
          </NavLink>
        </ul>

        {/* Create Account Button */}
        <div className="flex items-center">
        {
        token ? 
        <div className="flex items-center gap-2 cursor-pointer group relative ">
            <img className="w-10 rounded-full"src={assets.profile_pic}/>
            <img  className="w-2.5 "src={assets.dropdown_icon}/>
            <div className="absolute top-0 right-0 pt-14 text-base text-black-300 font-medium z-20 hidden group-hover:block">
                <div className="min-w-44 rounded flex flex-col bg-stone-100  gap-2 p-2">
                    <p onClick={()=>navigate('/my-profile')}>My Profile</p>
                    <p onClick={()=>navigate('/my-appointments')}>My appointments</p>
                    <p onClick={logOut}>Log out</p>
                </div>
            </div>
        </div> :
        <button onClick={()=>navigate('/login')} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hidden  md:block ">
        Create Account
      </button>
        }
        </div>
        <img   onClick={()=>setShowMenu(true) }className="mx-4 pt-4 w-6 md:hidden" src={assets.menu_icon}/>

        <div  className={`${showMenu ? 'fixed w-full' :'w-0 h-0'} md:hidden right-0 top-0 bottom-0  z-20 overflow-hidden bg-white transition-all`}>
          <div className ="flex flex-row justify-between px-8 py-8 ">
            <img className="w-34" src={assets.logo}/>
            <img className="w-8"  onClick={()=>setShowMenu(false)}src={assets.cross_icon}/>
          </div>
            <ul className="flex flex-col gap-2 items-center font-medium">
              <NavLink  onClick={()=>setShowMenu(false)}to="/"><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
              <NavLink  onClick={()=>setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block" >ABOUT</p></NavLink>
              <NavLink   onClick={()=>setShowMenu(false)} to ="/doctors"><p className="px-4 py-2 rounded inline-block" >ALL DOCTORS</p></NavLink>
              <NavLink  onClick={()=>setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block" >CONTACT</p></NavLink>
            </ul>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
