

import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddDoctor from './pages/Admin/AddDoctor';
import DashBoard from './pages/Admin/DashBoard';
import DoctorsList from './pages/Admin/DoctorsList';
import AllAppointment from './pages/Admin/AllAppointment';

const App = () => {

  const {aToken}=useContext(AdminContext)
  return aToken? (
    <div className="bg-white">
      
      <ToastContainer />
      <Navbar></Navbar>
      <div className="flex items-start">
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/all-appointments' element={<AllAppointment></AllAppointment>}/>
          <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}/>
          <Route path='/admin-dashboard' element={<DashBoard></DashBoard>}/>
          <Route path='/doctor-list' element={<DoctorsList></DoctorsList>}/>
        </Routes>
      </div>
    </div>

  ):(
    <div >
      <Login></Login>
      <ToastContainer />
    </div>
  )

}

export default App