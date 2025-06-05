

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
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorDashBoard from './pages/Doctor/DoctorDashBoard';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  return aToken || dToken ? (
    <div className="bg-white">
      
      <ToastContainer />
      <Navbar></Navbar>
      <div className="flex items-start">
        <Sidebar></Sidebar>
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>}/>
          <Route path='/all-appointments' element={<AllAppointment></AllAppointment>}/>
          <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}/>
          <Route path='/admin-dashboard' element={<DashBoard></DashBoard>}/>
          <Route path='/doctor-list' element={<DoctorsList></DoctorsList>}/>

          {/* Doctor Routes */}
          <Route path='/doctor-appointment' element={<DoctorAppointment></DoctorAppointment>}/>
          <Route path='/doctor-dashboard' element={<DoctorDashBoard></DoctorDashBoard>}/>
          <Route path='/doctor-profile' element={<DoctorProfile></DoctorProfile>}/>
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