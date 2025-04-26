import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointModel from '../models/appointModel.js';
import razorpay from 'razorpay'
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    

    // Input validations
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email is already registered." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Return success response
    res.status(201).json({ success: true, token });
    
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: error.message || "Internal server error." });
  }
};


const loginUser=async(req,res)=>{
  try{
    const {email,password}= req.body;
    // Backend pe request body log karo
console.log("🧠 Backend received:", req.body);

    console.log("🚀 Payload to backend:", { email, password });

    const user=await userModel.findOne({email});

    if(!user){
      res.json({success:false, message:"User doesn't exists"})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(isMatch){
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      res.json({success:true,token})
    }
    else{
      res.json({success:false,message:"Inavalid Credentials"})
    }


  }
  catch(error){
    res.json({success:false, message:error.message})
  }
  


}


const getUserProfile = async (req, res) => {
  try {

    console.log("🔐 Controller - userId from req.userId:", req.userId); // ✅ Should be set

    const userData = await userModel.findById(req.userId).select("-password");
    console.log("📦 Retrieved userData:", userData);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.log("❌ Controller Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, dob, phone, gender } = req.body;
    const userId = req.userId; // from auth middleware

    let address;

    try {
      address = JSON.parse(req.body.address);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Address must be a valid JSON object' });
    }

    if (!name || !address || !dob || !phone || !gender) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (typeof address !== 'object' || !address.line1 || !address.line2) {
      return res.status(400).json({ success: false, message: 'Invalid address format' });
    }

    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const updateData = { name, address, dob, phone, gender };

    const imageFile = req.file;
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('❌ Error in updateUser:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const bookAppointment = async (req, res) => {
  try {
    console.log("📥 Raw Request Body:", req.body);

    const userId = req.userId; // ✅ Get userId from auth middleware
    const { docId, slotDate, slotTime } = req.body;

    if (!userId || !docId || !slotDate || slotTime === undefined || slotTime === null) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked || {};
    if (!Array.isArray(slots_booked[slotDate])) {
      slots_booked[slotDate] = [];
    }

    if (slots_booked[slotDate].includes(slotTime)) {
      return res.status(409).json({ success: false, message: "Slot not available" });
    }
    

    slots_booked[slotDate].push(slotTime);

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { slots_booked: _, ...docInfoForAppointment } = docData.toObject();

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: docInfoForAppointment,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: new Date(),
    };

    await new appointModel(appointmentData).save();
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked successfully" });

  } catch (error) {
    console.error("❌ Error in bookAppointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




const listAppointMents=async(req,res)=>{
  try{
    const userId = req.userId; 
    const appointments= await appointModel.find({userId});
    res.json({success:true,appointments})

  }
  catch(error){
    console.error("❌ Error in bookAppointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }

}

const appointmentCancelled = async (req, res) => {
  try {
    const userId = req.userId; // From your authentication middleware
    const { appointmentId } = req.body; // appointmentId from request body

    const appointmentData = await appointModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
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


const razorpayInstance=new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_SECRET_KEY
})




const razorpayPayment=async(req,res)=>{
  try{

    const {appointmentId}=req.body;
    const appointmentData = await appointModel.findById(appointmentId);
    if(!appointmentData || appointmentData.cancelled){
      return res.json({success:false,message:"Appointment cancelled or not found"})
    }
  
    const options={
      amount:appointmentData.amount*100,
      receipt:appointmentId,
      currency:process.env.CURRENCY,
      
    }

    const order= await razorpayInstance.orders.create(options);
    console.log(order)
    return res.json({success:true,order})
  }
  catch (error) {
    console.error("❌ Error in appointmentCancelled:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}


const verifyRazorpay=async(req,res)=>{
  try{
    const {razorpay_order_id}=req.body;
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo)
    if(orderInfo.status=='paid' ||orderInfo.status=='created' ){
      await appointModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true,message:"Payment Successful"})
    }
    else{
      res.json({success:false,message:"Payment failed"})
    }
  }
  catch (error) {
    console.error("❌ Error in appointmentCancelled:", error);
    res.status(500).json({ success: false, message: error.message });
  }
  
}
export { registerUser,loginUser,getUserProfile ,updateUser,bookAppointment, listAppointMents,appointmentCancelled,razorpayPayment,verifyRazorpay};
