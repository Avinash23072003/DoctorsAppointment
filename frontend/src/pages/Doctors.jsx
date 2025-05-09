import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams(); // from route like /doctors/:speciality
  const { doctors } = useContext(AppContext); // getting all doctors from context
  const [fiterDoc, setFilterDoc] = useState([]); // filtered list of doctors
  const [filter, setFilter] = useState(false); // for toggle filter sidebar (mobile view)
  const navigate = useNavigate();

  // Apply filtering based on URL param (speciality)
  const applyFiter = () => {
    if (speciality) {
      const filtered = doctors.filter(
        doc => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors); // No speciality selected, show all
    }
  };

  // Run filter every time doctors list or speciality param changes
  useEffect(() => {
    applyFiter();
  }, [doctors, speciality]);

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto text-gray-900">
      <p className="mt-20 text-2xl font-semibold text-center mb-6">
        Browse Through Doctor Specialists
      </p>

      {/* Mobile filter button */}
      <div className="flex flex-col sm:flex-row gap-8">
        <button
          onClick={() => setFilter(prev => !prev)}
          className={`sm:hidden w-24 h-8 rounded-2xl border text-sm transition-all ${
            filter ? 'bg-blue-400 text-white' : ''
          }`}
        >
          Filter
        </button>

        {/* Filter Sidebar: Speciality List */}
        <div
          className={`flex flex-col gap-3 text-gray-700 font-medium text-lg ${
            filter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          {[
            'General Physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist'
          ].map(spec => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate('/doctors')
                  : navigate(`/doctors/${spec}`)
              }
              className="p-2 cursor-pointer hover:text-blue-500 transition border border-solid rounded-2xl"
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Right Side: Doctors Grid or Message */}
        <div className="flex-1">
          {fiterDoc.length === 0 ? (
            <h1 className="text-center text-xl text-red-500 font-semibold mt-10">
              No doctors available
            </h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {fiterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/appointments/${item._id}`);
                    scrollTo(0, 0);
                  }}
                  className="border border-blue-200 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg shadow-md"
                >
                  <img
                    className="w-full aspect-[5/3] object-cover bg-blue-200"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-green-500">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <p>Available</p>
                    </div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
