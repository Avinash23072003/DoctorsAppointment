import { createContext } from "react";

export const AppContext = createContext({}); // Optional default value

const currency = "₹";
const backEndUrl = import.meta.env.VITE_BACKEND_URL;

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const months = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const slotDateFormat = (slotDate) => {
  const dateArray = slotDate.split("_");
  return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
};

const AppContextProvider = (props) => {
  const value = { calculateAge, slotDateFormat, currency, backEndUrl };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
