import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendURL, token, getDoctorData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    console.log(dateArray);
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendURL + "/api/users/my-appointment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
      getDoctorData();
    }
  }, [token]);

  const cancelledAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);
      const { data } = await axios.post(
        backendURL + "/api/users/cancel-appointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPayment = async (order) => {
    const option = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appintment payment",
      description: "Payment Integration",
      order_id: order.id,

      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            backendURL + "/api/users/verify-razorpay",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(option);
    rzp.open();
  };
  const onlinePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/users/payment-razorpay",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message); // ✅ correct way to use toast.success
        initPayment(data.order); // ✅ order details
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // ✅ error toast
    }
  };

  return (
    <div classname="p-4">
      <p className="pt-24 text-center text-2xl">My Appointment</p>

      {appointments.map((item, index) => (
        <div
          className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          key={index}
        >
          <div>
            <img className="w-32 bg-indigo-200" src={item?.docData?.image} />
          </div>
          <div className="flex-1 text-zinc-600">
            <p>{item?.docData?.name}</p>
            <p>{item?.docData?.speciality}</p>
            <p>Adress</p>
            <p>{item?.docData?.address.line1}</p>
            <p>{item?.docData?.address.line2}</p>
            <p>
              Date & Time :{" "}
              <span>
                {slotDateFormat(item.slotDate)} || {item.slotTime}{" "}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-6 justify-end">
            {!item.cancelled && item.payment && !item.isComplete && (
              <button className="text-sm text-white text-center sm:min-w-48 py-2 border rounded bg-green-500  hover:text-white cursor-pointer">
                Paid
              </button>
            )}
            {!item.cancelled && !item.payment &&  !item.isComplete &&(
              <button
                className="text-sm text-blue-400 text-center sm:min-w-48 py-2 border rounded- hover:bg-blue-500  hover:text-white cursor-pointer"
                onClick={() => onlinePayment(item._id)}
              >
                Pay Online
              </button>
            )}

            {!item.cancelled &&  !item.isComplete && (
              <button
                className="text-sm   text-center sm:min-w-48 py-2  border border-red-500  rounded text-red-400 hover:bg-red-700 hover:text-white  cursor-pointer"
                onClick={() => cancelledAppointment(item._id)}
              >
                Cancel Appointment
              </button>
            )}
            {item.cancelled  &&  !item.isComplete && (
              <button className="sm:min w-48 py-2 border border-red-500  rounded text-red-400 cursor-pointer">
                Appointment Cancelled
              </button>
            )}
            {item.isComplete && <button className="sm:min w-48 py-2 border border-green-500  rounded text-green-400 cursor-pointer">Completed</button> }
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
