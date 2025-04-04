import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-blue-400 rounded-lg px-6 md:px-10 pt-20">
      {/* Left section */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-6 md:py-10 text-center md:text-left">
        <p className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Book appointments <br /> with trusted doctors
        </p>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img src={assets.group_profiles} className="w-20 sm:w-28" alt="Profiles" />
          <p className="text-white text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eos, voluptas vel
            commodi dolores nobis, unde at eligendi.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white text-blue-500 px-4 py-2 rounded-md font-medium shadow-md hover:bg-blue-500 hover:text-white transition"
        >
          Book Appointment
          <img src={assets.arrow_icon} className="w-5" alt="Arrow" />
        </a>
      </div>

      {/* Right section */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
        <img
          src={assets.header_img}
          alt="Header"
          className="w-4/5 md:w-full max-w-md md:max-w-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
