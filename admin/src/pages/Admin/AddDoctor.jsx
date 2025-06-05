import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from 'axios'
const AddDoctor = () => {
    const [docImg,setDocImg]=useState('')
    const[name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [experience,setExperience]=useState('1 Year');
    const [fees,setFees]=useState('')
    const [about,setAbout]=useState('');
    const [speciality,setSpeciality]=useState('General Physician')
    const [degree,setDegree]=useState('')
    const [address1,setAddress1]=useState('');
    const [address2,setAddress2]=useState('')
const {backEndUrl, aToken}=useContext(AdminContext)
    const onSubmitHandler=async(event)=>{
          event.preventDefault()
          try{
            if(!docImg){
                return toast.error("plz select image")
            }
            const formData=new FormData;
            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',fees)
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));


            formData.forEach((value,key)=>{
                console.log(`${key}:${value}`)
            })
        const {data}=await axios.post(backEndUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
        console.log(data);
        if(data.success){
            toast.success(data.message)
            setDocImg('');
            setName('');
            setEmail('');
            setPassword('');
            setFees('');
            setDegree('');
            setAbout('');
            setAddress1('');
            setAddress2('');
        
            
        }
        else{
            toast.error(data.message)
            
        }
          }
          catch(error){
            toast.error(error.message)
            console.log(error);
          }
    }
  return (
    <form onSubmit={onSubmitHandler} className="px-4 py-5 sm:px-6 md:px-8 w-full">
      <p className="mb-4 text-xl sm:text-2xl font-semibold text-gray-800">Add Doctor</p>

      <div className="bg-white px-4 py-5 sm:px-6 md:px-8 rounded-lg shadow-md w-full max-w-5xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        
        {/* Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload Area"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
            />
          </label>
          <input type="file" id="doc-img" hidden   onChange={(e)=>setDocImg(e.target.files[0])}/>
          <p className="mt-2 text-sm text-gray-600 text-center">Upload Doctor Picture</p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Doctor Name</label>
              <input type="text" placeholder="Name" required className="w-full px-4 py-2 border rounded-md" onChange={(e)=>setName(e.target.value)} value={name} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Doctor Email</label>
              <input type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-md" onChange={(e)=>setEmail(e.target.value)} value={email} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-md" onChange={(e)=>setPassword(e.target.value)} value={password} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Experience</label>
              <select required className="w-full px-4 py-2 border rounded-md " onChange={(e)=>setExperience(e.target.value)} value={experience}>
                <option value="">Select Experience</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5+ year">5+ Year</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Fees</label>
              <input type="number" placeholder="Fees" required className="w-full px-4 py-2 border rounded-md" onChange={(e)=>setFees(e.target.value)} value={fees}/>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700" >Speciality</label>
              <select required className="w-full px-4 py-2 border rounded-md" onChange={(e)=>setSpeciality(e.target.value)} value={speciality}>
                <option>General Physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Education</label>
              <input type="text" placeholder="Education" required className="w-full px-4 py-2 border rounded-md" onChange={(e)=>setDegree(e.target.value)} value={degree}/>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input type="text" placeholder="Address Line 1" required className="w-full px-4 py-2 border rounded-md mb-2" onChange={(e)=>setAddress1(e.target.value)} value={address1} />
              <input type="text" placeholder="Address Line 2" className="w-full px-4 py-2 border rounded-md"  onChange={(e)=>setAddress2(e.target.value)}  value={address2} />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">About Doctor</label>
          <textarea  onChange={(e)=>setAbout(e.target.value)} value={about} 
            placeholder="Write something about the doctor..."
            rows={4}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center sm:text-right">
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
