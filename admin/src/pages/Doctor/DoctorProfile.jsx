import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, docData, setDocData, getDocData } = useContext(DoctorContext);
  const { currency, backEndUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dToken) {
      getDocData();
    }
  }, [dToken]);

  const handleInputChange = (field, value) => {
    setDocData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (line, value) => {
    setDocData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [line]: value
      }
    }));
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const updatedData = {
        address: docData.address,
        fees: docData.fees,
        available: docData.available,
        about: docData.about,
      };
   console.log(backEndUrl + '/api/doctor/update-profile');

      const { data } = await axios.post(
        `${backEndUrl}/api/doctor/update-profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        toast.success('Profile Updated Successfully');
        setIsEdit(false);
        getDocData(); // Refresh data
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return docData && (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
          <img
            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-blue-500"
            src={docData.image}
            alt={`${docData.name}'s profile`}
          />
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">{docData.name}</h2>
            <p className="text-gray-600 text-sm">
              {docData.degree} - {docData.speciality}
            </p>
            <p className="text-sm text-gray-500">Experience: {docData.experience} years</p>
            <p className="text-sm font-medium text-gray-700">
              Appointment Fees:
              <span className="text-blue-600">
                {' '}{currency}{' '}
                {isEdit ? (
                  <input
                    type="number"
                    className="ml-2 border rounded px-2 py-1 text-sm"
                    value={docData.fees}
                    onChange={(e) => handleInputChange('fees', e.target.value)}
                  />
                ) : (
                  docData.fees
                )}
              </span>
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-1">About</h3>
          {isEdit ? (
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              value={docData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-600">{docData.about}</p>
          )}
        </div>

        {/* Address Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-1">Address</h3>
          <p className="text-sm text-gray-600">
            {isEdit ? (
              <input
                type="text"
                className="w-full border rounded px-3 py-1 text-sm mb-2"
                value={docData.address.line1}
                onChange={(e) => handleAddressChange('line1', e.target.value)}
              />
            ) : (
              docData.address.line1
            )}
          </p>
          <p className="text-sm text-gray-600">
            {isEdit ? (
              <input
                type="text"
                className="w-full border rounded px-3 py-1 text-sm"
                value={docData.address.line2}
                onChange={(e) => handleAddressChange('line2', e.target.value)}
              />
            ) : (
              docData.address.line2
            )}
          </p>
        </div>

        {/* Availability + Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={docData.available}
              onChange={(e) => handleInputChange('available', e.target.checked)}
              className="accent-blue-500"
              disabled={!isEdit}
            />
            Available
          </label>

          {isEdit ? (
            <div className="flex gap-2 mt-3 sm:mt-0">
              <button
                className={`bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition ${loading && 'opacity-60 cursor-not-allowed'}`}
                onClick={updateProfile}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                className="cursor-pointer bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2 rounded-lg transition"
                onClick={() => {
                  setIsEdit(false);
                  getDocData(); // Reset unsaved changes
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="cursor-pointer mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-lg transition"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
