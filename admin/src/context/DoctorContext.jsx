import axios from "axios";
import { get } from "mongoose";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") || ""
  );

  const [appointments,setAppointments]=useState([]);
  const [dashData,setDashData]=useState(false);
  const [docData,setDocData]=useState(false)
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const currency="₹";
  const getAppointments = async () => {
  try {
    const { data } = await axios.get(`${backEndUrl}/api/doctor/appointments`, {
      headers: {
        Authorization: `Bearer ${dToken}`  // ✅ Proper way to send token
      }
    });

    if (data.success) {
      setAppointments(data.appointments.reverse());
      console.log(data.appointments.reverse());
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Fetch appointments error:", error);
    toast.error(error.message);
  }
};

const completeAppointment=async(appointmentId)=>{
  try{
        const { data } = await axios.post(`${backEndUrl}/api/doctor/complete-appointment`,{appointmentId} ,{
      headers: {
        Authorization: `Bearer ${dToken}`  // ✅ Proper way to send token
      }
    });
    if(data.success){
      toast.success(data.message);
       getAppointments();

    }
    else{
      toast.error(data.message);
    }

  }
  catch (error) {
    console.error("Fetch appointments error:", error);
    toast.error(error.message);
  }

}

const cancelAppointment=async(appointmentId)=>{
  try{
        const { data } = await axios.post(`${backEndUrl}/api/doctor/cancel-appointment`,{appointmentId} ,{
      headers: {
        Authorization: `Bearer ${dToken}`  // ✅ Proper way to send token
      }
    });
    if(data.success){
      toast.success(data.message);
      getAppointments();

    }
    else{
      toast.error(data.message);
      console.log(data.message)
    }

  }
  catch (error) {
    console.error("Fetch appointments error:", error);
    toast.error(error.message);
  }
}


const getDashData=async()=>{
  try{
    const {data}=await axios.get(backEndUrl+'/api/doctor/dashBoard',{headers: {
        Authorization: `Bearer ${dToken}`  // ✅ Proper way to send token
      }});
      if(data.success){
        toast.success(data.message);
        console.log( data.dashData);
        setDashData(data.dashData)
      }
      else{
        toast.error(data.message)
      }


  }catch (error) {
    console.error("Error In updating DashBoard:", error);
    toast.error(error.message);
  }
}

const getDocData=async()=>{
  try{
    const {data}=await axios.get(backEndUrl+'/api/doctor/docProfile',{headers: {
        Authorization: `Bearer ${dToken}`  // ✅ Proper way to send token
      }})

      if(data.success){
        setDocData(data.docData);
        console.log(data.docData)
      }
      else{
        toast.error(data.message);
        console.log(data.message)
      }

  }
  catch (error) {
    console.error("Error In getting docData:", error);
    toast.error(error.message);
  }
}
  const value = {
     currency,
    dToken,
    setDToken,
    backEndUrl,
    appointments,setAppointments,
    getAppointments,completeAppointment,
    cancelAppointment,dashData,setDashData,getDashData,
    docData,setDocData,getDocData

  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
