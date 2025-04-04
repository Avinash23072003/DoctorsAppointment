import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { useState } from 'react'
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange=(e)=>{
    
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };
  return (
   <div className="p-4">
      <div className="text-center">
      <p className="text-3xl">CONTACT US</p>
      </div>
      <div className="my-10 w-full  flex flex-col md:flex-row gap-6 ">
        <img  className="w-full md:max-w-[300px]"src={assets.contact_image}/>

        <div>
          <b>Our Office</b>

          <p>Dr.B.R. Ambedkar Hostel Yerwada</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, excepturi?</p>
           <br/>
          <b >CAREERS AT PRESCRIPTO</b>
          <br/>

          <button className="w-full rounded cursor-pointer mt-10 border border-gray-400 hover:bg-blue-400">EXPLORE JOBS</button>
          
        </div>
       
      </div>

     
     </div>
  )
}

export default Contact