import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets_admin/assets.js";

const AllAppointment = () => {
  const { aToken, appointments, getAppointmentData, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAppointmentData();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-semibold text-center">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-lg">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_1fr_0.8fr_1.4fr_1fr_1fr_1fr] p-4 border-b bg-gray-100 font-semibold text-gray-600 gap-4">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Table Rows */}
        {appointments?.slice().reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between items-center max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_1fr_0.8fr_1.4fr_1fr_1fr_1fr] text-gray-700 py-3 px-6 border-b hover:bg-gray-50 gap-4"
          >
            {/* Serial Number */}
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                src={item?.userData?.image}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item?.userData?.name}</p>
            </div>

            {/* Age */}
            <p>{calculateAge(item?.userData?.dob)} yrs</p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item?.slotDate)} | {item?.slotTime}
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-2">
              <img
                src={item?.docData?.image}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item?.docData?.name}</p>
            </div>

            {/* Fees */}
            <p>₹ {item?.docData?.fees}</p>

            {/* Actions */}
            <div>
              {item.cancelled ? 
                <p className="text-red-500 font-medium">Cancelled</p>
               : item.isComplete ? 
                <p className="text-green-500 font-medium">Completed</p>
                :<img onClick={()=>cancelAppointment(item._id)}  src={assets.cancel_icon}className="w-10 cursor-pointer"/>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
