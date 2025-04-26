import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_frontend/assets";
const MyProfile = () => {
  const { userData, setUserData, getUserData, token, backendURL } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));

      image && formData.append("image", image);


      const {data} = await axios.post(
        'http://localhost:3000/api/users/update-profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
         
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        await getUserData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    userData && (
      <div className="pt-34 flex flex-col items-center p-6">
        {/* Profile Picture */}
        {isEdit ? (
          <label htmlFor="image" className="mb-2 font-medium">
            <div className="relative inline-block cursor-pointer">
              {/* Profile Image */}
              <img
                className="w-36 h-36 rounded-full object-cover opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile Preview"
              />

              {/* Upload Icon */}
              <img
                className="w-10 h-10 absolute bottom-2 right-2 bg-white p-1 rounded-full shadow"
                src={assets.upload_icon}
                alt="Upload Icon"
              />
            </div>

            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            src={userData.image}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md"
          />
        )}

        {/* Name */}
        <div className="flex flex-col items-center">
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border p-2 mt-2 rounded w-full text-center"
            />
          ) : (
            <p className="mt-2 text-lg font-semibold">{userData.name}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-6 w-full max-w-md p-4 border rounded-lg shadow-md">
          <p className="text-lg font-bold">Contact Information</p>

          <div className="mt-2">
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{userData.email}</p>
          </div>

          <div className="mt-2">
            <p className="text-gray-600">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border p-2 w-full rounded"
              />
            ) : (
              <p className="font-medium">{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="mt-2">
            <p className="text-gray-600">Address:</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={userData.address?.line1 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="border p-2 w-full rounded mb-2"
                />
                <input
                  type="text"
                  value={userData.address?.line2 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="border p-2 w-full rounded"
                />
              </>
            ) : (
              <p className="font-medium">
                {userData.address?.line1}, {userData.address?.line2}
              </p>
            )}
          </div>

          {/* Gender & DOB */}
          <div className="mt-2">
            <p className="text-gray-600">Gender:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border p-2 w-full rounded"
              />
            ) : (
              <p className="font-medium">{userData.gender}</p>
            )}
          </div>

          <div className="mt-2">
            <p className="text-gray-600">Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border p-2 w-full rounded"
              />
            ) : (
              <p className="font-medium">{userData.dob}</p>
            )}
          </div>

          {/* Button */}
          <button
            className="mt-4 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    )
  );
};

export default MyProfile;
