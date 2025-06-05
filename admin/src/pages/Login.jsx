import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backEndUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("aToken");
    if (token) {
      setAToken(token);
      navigate("/admin-dashboard");
    }
  }, [navigate, setAToken]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backEndUrl}/api/admin/login`, {
          email,
          password,
        });
         console.log(data);
        if (data.sucess && data.token) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          toast.success(data.message || "Admin login successful");
          navigate("/admin-dashboard");
        } else {
          toast.error(data.message || "Admin login failed");
        }
      } else {
        const { data } = await axios.post(`${backEndUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success && data.token) {
          localStorage.setItem("dToken", data.token);

          setDToken(data.token);
          console.log(data.token)
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          toast.success(data.message || "Doctor login successful");
          navigate("/doctor-dashboard");
        } else {
          toast.error(data.message || "Doctor login failed");
        }
      }
    } catch (error) {
      console.error(`${state} login error:`, error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4"
    >
      <div className="flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border rounded-xl bg-white shadow-lg text-sm w-full max-w-md">
        <p className="text-lg font-semibold">
          <span className="text-blue-600">{state}</span> Login
        </p>

        <div className="w-full">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full"
        >
          Login
        </button>

        {state === "Admin" ? (
          <p>
            Doctor login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-blue-400 cursor-pointer underline"
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-blue-400 cursor-pointer underline"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
