import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

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

export { registerUser,loginUser };
