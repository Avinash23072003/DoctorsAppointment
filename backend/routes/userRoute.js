import express from 'express'
import { getUserProfile, loginUser, registerUser, updateUser ,bookAppointment,listAppointMents,appointmentCancelled,razorpayPayment,verifyRazorpay} from '../controllers/userController.js';
const userRouter=express.Router();
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getUserProfile)
userRouter.post('/update-profile', authUser, upload.single('image'), updateUser);

userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/my-appointment',authUser,listAppointMents)
userRouter.post('/cancel-appointment',authUser,appointmentCancelled)
userRouter.post('/payment-razorpay',authUser,razorpayPayment)
userRouter.post('/verify-razorpay',authUser,verifyRazorpay)
export default userRouter;