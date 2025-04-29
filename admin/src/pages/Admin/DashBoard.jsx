import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const DashBoard = () => {
  const { aToken, doctors, cancelAppointment, getDashData, dashBoardData } =
    useContext(AdminContext);
const {slotDateFormat}=useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashBoardData && (
      <div className="m-5">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:scale-105 transition-transform">
            <img className="w-12 h-12" src={assets.doctor_icon} alt="Doctor" />
            <div>
              <p className="text-xl font-bold">{dashBoardData.doctors}</p>
              <p className="text-gray-600 font-semibold">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:scale-105 transition-transform">
            <img className="w-12 h-12" src={assets.appointments_icon} alt="Appointments" />
            <div>
              <p className="text-xl font-bold">{dashBoardData.appointments}</p>
              <p className="text-gray-600 font-semibold">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:scale-105 transition-transform">
            <img className="w-12 h-12" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-xl font-bold">{dashBoardData.patients}</p>
              <p className="text-gray-600 font-semibold">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="bg-white rounded-xl border">
          <div className="flex items-center gap-3 px-6 py-4 border-b">
            <img className="w-6 h-6" src={assets.list_icon} alt="List" />
            <p className="font-semibold text-lg">Latest Appointments</p>
          </div>

          <div className="divide-y">
            {dashBoardData.latestAppointment.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full object-cover" src={item.docData.image} alt="Doctor" />
                  <div>
                    <p className="font-medium">{item.docData.name}</p>
                    <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)} || {item.slotTime}</p>
                  </div>
                </div>
                <div>
                  {item.cancelled ? (
                    <span className="text-red-500 font-medium">Cancelled</span>
                  ) : (
                    <span
                      onClick={() => cancelAppointment(item._id)}
                      className="cursor-pointer text-green-500 font-medium hover:underline"
                    >
                      Active
                    </span>
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

export default DashBoard;
