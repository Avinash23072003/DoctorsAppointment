import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
const Banner = () => {
    const navigate=useNavigate()
  return (
    <div className="relative w-full bg-blue-100 py-10 px-5 md:px-10 flex flex-col-reverse md:flex-row items-center justify-between">
      
      {/* Left Section - Text & Button */}
      <div className="flex flex-col gap-4 text-gray-900 md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Book Appointments
        </h1>
        <p className="text-lg text-gray-600">With 1000+ Verified Doctors</p>
        <button className="mt-4 px-4 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition" onClick={()=>{navigate('/login'); scrollTo(0,0)}}>
          Create Account
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-2/2 flex justify-center">
        <img
          className="w-full max-w-md md:max-w-lg object-cover"
          src={assets.appointment_img}
          alt="Banner"
        />
      </div>
      
    </div>
  );
};

export default Banner;
