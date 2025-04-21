import { createContext, useEffect } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios";
export const AppContext = createContext();
import { useState } from "react";
import { toast } from "react-toastify";
const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctor] = useState([]);
  const [token,setToken]=useState('')
  

  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/doctor/list");
      console.log("Doctor API response:", data);  // <-- ADD THIS
  
      if (data.success) {
        setDoctor(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Doctor API error:", error);
      toast.error(error.message);
    }
  };
  
  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendURL

  };
  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
