import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointModel from '../models/appointModel.js';
import userModel from '../models/userModel.js';
const addDoctor = async (req, res) => {
  try {
    console.log("✅ Route hit");

    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const file = req.file;

    console.log("📦 Form Data:", req.body);
    console.log("📸 Image File:", file);

    if (!file) {
      return res.status(400).json({ success: false, message: "Image file is missing!" });
    }

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password too short" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const cloudResult = await cloudinary.uploader.upload(file.path, {
      resource_type: "image"
    });

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: cloudResult.secure_url,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully", doctor: newDoctor });

  } catch (error) {
    console.error("❌ Error adding doctor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const adminLogin=async(req,res)=>{

const {email,password}=req.body;
console.log(req.body);
console.log(process.env.JWT_SECRET)
try{
if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
         const token=jwt.sign(email+password,process.env.JWT_SECRET);
         res.json({sucess:true,token})
         console.log("JWT Token is",token)
}
else{
  res.json({sucess:false, message:"Invalid credentials"});
}
}
catch(error){
  console.error("❌ Error :", error);
    res.status(500).json({ success: false, message: error.message });
  }


}

const allDoctors=async(req,res)=>{
  try{

    const doctor= await doctorModel.find({}).select('-password')
    res.json({sucess:true,doctor})
  }
  catch(error){
    console.log(error.message);
   res.json({success:false, message:error.message})
  }
}


const getAllAppointments=async(req,res)=>{
  try{
const appointments= await appointModel.find({});
res.json({success:true,appointments})

  }
  catch(error){
    console.log(error.message);
   res.json({success:false, message:error.message})
  }

}

const adminAppointmentCancelled = async (req, res) => {
  try {
   
    const { appointmentId } = req.body; // appointmentId from request body

    const appointmentData = await appointModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

   

    await appointModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (!doctorData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked;

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error("❌ Error in appointmentCancelled:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const adminDashoard = async (req, res) => {
  try {
    const doctor = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointModel.find({});

    const latestAppointments = appointments.slice().reverse().slice(0, 5); // or use sort+limit

    const dashBoardData = {
      doctors: doctor.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointment: latestAppointments,
    };

    res.json({ success: true, dashBoardData });
  } catch (error) {
    console.error("❌ Error in adminDashboard:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { addDoctor,adminLogin ,allDoctors, getAllAppointments,adminAppointmentCancelled,adminDashoard};
