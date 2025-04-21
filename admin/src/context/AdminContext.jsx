import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
  const backEndUrl=import.meta.env.VITE_BACKEND_URL;
const [doctors,setDoctors]=useState([])
 

const getAllDoctors = async () => {
  try {
    console.log("Token:", aToken);
    console.log("Backend URL:", backEndUrl);

    const { data } = await axios.post(
      `${backEndUrl}/api/admin/all-doctor`,
      {},
      {
        headers: {aToken}
      }
    );

    console.log("Response from /all-doctor:", data);

  
      setDoctors(data.doctor);
      console.log("Doctors list:", data.doctor);
    
  } catch (error) {
    console.error("API error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
};


const changeAvailability=async(docId)=>{
  try{

    const { data } = await axios.post(
      `${backEndUrl}/api/admin/change-availibility`,
      { docId },
      { headers: { aToken } }
    );
    
    if(data.sucess){
      toast.success(data.message)
      getAllDoctors();
    }
    else{
      toast.error(data.message)
    }
  }
  catch(error){
    console.log(error);
  }
}
  const value = {
    aToken,setAToken,
    backEndUrl,doctors,getAllDoctors,changeAvailability
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
