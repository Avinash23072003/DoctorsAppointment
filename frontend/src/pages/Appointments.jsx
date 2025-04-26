import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import OtherRelatedDoc from "../components/OtherRelatedDoc";
import { toast } from "react-toastify";
import axios from "axios";
import dayjs from "dayjs";
const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, getDoctorData, backendURL } =
    useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(null);
  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

  const fetchInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  const getAvailableSlot = () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = dayjs(currentDate).format("HH:mm"); // Standard format for comparison
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;

      const selectedTime = docSlots[slotIndex][
        slotTime
      ]?.dateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const { data } = await axios.post(
        `${backendURL}/api/users/book-appointment`,
        { docId, slotDate, slotTime: selectedTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: () => true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error?.response?.data || error.message);
      toast.error("Something went wrong while booking. Try again.");
    }
  };

  useEffect(() => {
    fetchInfo();
    getAvailableSlot();
  }, [doctors, docId]);

  return (
    docInfo && (
      <div className="flex flex-col gap-6 mt-24 px-4">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-full sm:w-auto">
            <img
              className="w-full sm:w-72 bg-blue-400 rounded-lg shadow-md"
              src={docInfo?.image}
              alt={docInfo?.name}
            />
          </div>
          <div className="flex-1 border border-gray-300 rounded-lg p-6 py-7 bg-white shadow-md">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              {docInfo?.name}
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="w-5 h-5"
              />
            </h1>
            <div className="mt-3">
              <h3 className="text-gray-600">
                {docInfo?.degree} - {docInfo?.speciality}
              </h3>
              <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">
                {docInfo?.experience} Experience
              </button>
            </div>
            <div className="mt-5">
              <h3 className="text-gray-800 font-medium flex items-center gap-2">
                About{" "}
                <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
              </h3>
              <p className="text-gray-600 text-sm mt-1">{docInfo?.about}</p>
              <p className="text-blue-600 font-medium mt-2">
                Appointment Fees: <span>{currencySymbol}</span>
                {docInfo?.fees}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 font-medium text-black-400">
          <p>Booking Slots</p>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map(
                (slots, index) =>
                  slots.length > 0 && (
                    <div
                      onClick={() => setSlotIndex(index)}
                      key={index}
                      className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-blue-400 text-white" : "border border-white"}`}
                    >
                      <p>{daysOfWeek[slots[0].dateTime.getDay()]}</p>
                      <p>{slots[0].dateTime.getDate()}</p>
                    </div>
                  )
              )}
          </div>
          <div className="flex items-center w-full gap-5 overflow-x-scroll mt-10">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(index)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border ${slotTime === index ? "bg-blue-400 text-white" : "border-white"}`}
                  key={index}
                >
                  {new Date(item.dateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="mt-10 p-4 rounded-full bg-white hover:bg-blue-400 border border-solid cursor-pointer"
          >
            Book an Appointment
          </button>
        </div>

        <OtherRelatedDoc docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;
