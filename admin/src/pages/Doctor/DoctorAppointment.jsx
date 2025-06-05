import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments,completeAppointment,
    cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-4">
      <p className="mb-3 text-lg font-semibold">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">

        {/* Header - only visible on md and up */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 py-3 font-semibold border-b px-4">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] md:items-center md:gap-3 md:px-4 md:py-3 md:border-b
            flex flex-col gap-3 p-4 border-b md:border-0"
          >
            {/* # Index */}
            <p className="md:block hidden">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img
                src={item.userData?.image || "/default-avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item.userData?.name || "N/A"}</p>
            </div>

            {/* Payment */}
            <p className="text-xs border border-blue-400 px-2 py-0.5 rounded-full w-fit">
              {item.payment ? "Online" : "Cash"}
            </p>

            {/* Age */}
            <p className="md:block hidden">{calculateAge(item.userData?.dob)}</p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)},{" "}
              <span className="text-blue-600">{item.slotTime}</span>
            </p>

            {/* Fees */}
            <p>₹{item.amount}</p>
      

          {
            item.cancelled ? <p className="text-red-600">Cancel</p>
          :item.isComplete ? <p className="text-green-600">Completed</p>
          : <div className="flex gap-2">
              <img
                className="w-8 cursor-pointer hover:scale-105 transition-transform"
                src={assets.cancel_icon}
                alt="Cancel"
                onClick={()=>cancelAppointment(item._id)}
              />
              <img
                className="w-8 cursor-pointer hover:scale-105 transition-transform"
                src={assets.tick_icon}
                alt="Confirm"
                onClick={()=>completeAppointment(item._id)}
              />
            </div>
          }
            {/* Action Icons */}
            
          </div>
        ))}

        {appointments.length === 0 && (
          <p className="text-center py-8 text-gray-400">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
