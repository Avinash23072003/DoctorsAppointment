import React from "react";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointModel from "../models/appointModel.js";
const changeDoctorAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ sucess: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors }); // FIXED "success"
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ sucess: false, message: "Invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, doctor.password);
    if (isMatched) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ sucess: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API's for Doctor routing

const appointmentDoctor = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointModel.find({ docId }); // ✅ pass as object

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API's  for checkingappointment

const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId) {
      if (appointmentData.isComplete) {
        return res.json({
          success: true,
          message: "Already marked as completed.",
        });
      }

      await appointModel.findByIdAndUpdate(appointmentId, { isComplete: true });
      return res.json({
        success: true,
        message: "Appointment marked as completed.",
      });
    } else {
      return res.json({ success: false, message: "Mark failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api for cancel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({ success: true, message: "Appointment  Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const docDashData=async(req,res)=>{
  try{

    const docId = req.docId;
    const appointments=await appointModel.find({docId});
    let earnings=0;

    appointments.map((item)=>{
      if(item.isCompleted ||item.payment){
        earnings=earnings+item.amount;
      }

    })

    let patients=[];
     appointments.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId);
      }
    })

    const dashData={
      earning:earnings,
      appointments:appointments.length,
      patients:patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
    
    }
    res.json({success:true,dashData})

  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const docProfile=async(req,res)=>{
  try{
     const docId = req.docId;
    const docData= await doctorModel.findById(docId).select('-password');
    res.json({success:true,docData})

  }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const updateDocData = async (req, res) => {
  try {
    const docId = req.docId;
    const { fees, address, available, about } = req.body;

    const updatedDoc = await doctorModel.findByIdAndUpdate(
      docId,
      { fees, address, available, about },
      { new: true } // optional: returns updated document
    );

    if (!updatedDoc) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    return res.json({ success: true, message: "Profile Updated Successfully" });

  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  changeDoctorAvailability,
  doctorList,
  loginDoctor,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancel,
  docDashData,docProfile,
  updateDocData
};
