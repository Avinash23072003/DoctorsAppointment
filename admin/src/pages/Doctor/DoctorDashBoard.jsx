import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { get } from "mongoose";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";
const DoctorDashBoard = () => {
  const { dToken, dashData, setDashData, getDashData,cancelAppointment,completeAppointment } =
    useContext(DoctorContext);
  const currencySymbol = "₹";
  const { slotDateFormat } = useContext(AppContext);
  console.log(currencySymbol);
  useEffect(() => {
    getDashData();
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:scale-105 transition-transform">
            <img className="w-12 h-12" src={assets.earning_icon} alt="Doctor" />
            <div>
              <p className="text-xl font-bold">
                {currencySymbol} {dashData.earning}
              </p>
              <p className="text-gray-600 font-semibold">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:scale-105 transition-transform">
            <img
              className="w-12 h-12"
              src={assets.appointments_icon}
              alt="Appointments"
            />
            <div>
              <p className="text-xl font-bold">{dashData.appointments}</p>
              <p className="text-gray-600 font-semibold">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:scale-105 transition-transform">
            <img
              className="w-12 h-12"
              src={assets.patients_icon}
              alt="Patients"
            />
            <div>
              <p className="text-xl font-bold">{dashData.patients}</p>
              <p className="text-gray-600 font-semibold">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border">
          <div className="flex items-center gap-3 px-6 py-4 border-b">
            <img className="w-6 h-6" src={assets.list_icon} alt="List" />
            <p className="font-semibold text-lg">Latest Bookings</p>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={item.userData.image}
                    alt="Doctor"
                  />
                  <div>
                    <p className="font-medium">{item.userData.name}</p>
                    <p className="text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)} || {item.slotTime}
                    </p>
                  </div>
                </div>
                <div>
                  {item.cancelled ? (
                    <p className="text-red-600">Cancel</p>
                  ) : item.isComplete ? (
                    <p className="text-green-600">Completed</p>
                  ) : (
                    <div className="flex gap-2">
                      <img
                        className="w-8 cursor-pointer hover:scale-105 transition-transform"
                        src={assets.cancel_icon}
                        alt="Cancel"
                        onClick={() => cancelAppointment(item._id)}
                      />
                      <img
                        className="w-8 cursor-pointer hover:scale-105 transition-transform"
                        src={assets.tick_icon}
                        alt="Confirm"
                        onClick={() => completeAppointment(item._id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashBoard;
