import React from 'react'
import doctorModel from '../models/doctorModel.js';

const changeDoctorAvailability = async(req,res) => {
 try{
    const {docId}=req.body;
    const docData= await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    res.json({sucess:true, message:"Availability changed"})

 }catch(error){
    console.log(error);
    res.json({sucess:false,message:error.message})
 }
}

const doctorList = async (req, res) => {
   try {
     const doctors = await doctorModel.find({}).select(['-password', '-email']);
     res.json({ success: true, doctors });  // FIXED "success"
   } catch (error) {
     console.log(error);
     res.json({ success: false, message: error.message });
   }
 };
 

export {changeDoctorAvailability,doctorList}