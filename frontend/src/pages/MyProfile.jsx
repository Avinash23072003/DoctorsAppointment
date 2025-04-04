import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';

const MyProfile = () => {
  const [userData, setUserdata] = useState({
    name: 'Avani Chitare',
    image: assets.profile_pic,
    email: 'chitareavi123@gmail.com',
    phone: '825109334',
    address: {
      line1: 'Daund',
      line2: 'B.R. Ambedkar Hostel',
    },
    gender: 'Male',
    dob: '23-07-2003',
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="pt-34 flex flex-col items-center p-6">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <img src={userData.image} alt="Profile" className="w-24 h-24 rounded-full shadow-md" />
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserdata((prev) => ({ ...prev, name: e.target.value }))}
            className="border p-2 mt-2 rounded w-full text-center"
          />
        ) : (
          <p className="mt-2 text-lg font-semibold">{userData.name}</p>
        )}
      </div>

      {/* Contact Information */}
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
              onChange={(e) => setUserdata((prev) => ({ ...prev, phone: e.target.value }))}
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
                value={userData.address.line1}
                onChange={(e) =>
                  setUserdata((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserdata((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="border p-2 w-full rounded mt-2"
              />
            </>
          ) : (
            <p className="font-medium">
              {userData.address.line1}, {userData.address.line2}
            </p>
          )}
        </div>

        {/* Gender & DOB */}
        <div className="mt-2">
          <p className="text-gray-600">Gender:</p>
          <p className="font-medium">{userData.gender}</p>
        </div>

        <div className="mt-2">
          <p className="text-gray-600">Date of Birth:</p>
          <p className="font-medium">{userData.dob}</p>
        </div>

        {/* Edit Button */}
        <button
          className="mt-4 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setIsEdit(true)}
        >
          {isEdit ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
