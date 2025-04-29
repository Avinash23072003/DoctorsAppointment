import express from 'express';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import { adminLogin,allDoctors,getAllAppointments,adminAppointmentCancelled ,adminDashoard} from '../controllers/adminController.js';
const adminRouter = express.Router();
import authAdmin from '../middlewares/authAdmin.js';
import { changeDoctorAvailability } from '../controllers/doctorController.js';
// ✅ Fix: multer setup must be upload.single('image')
adminRouter.post('/add-doctor',  authAdmin,upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.post('/all-doctor',authAdmin,allDoctors)
adminRouter.post('/change-availibility',authAdmin,changeDoctorAvailability)
adminRouter.get('/get-appointments',authAdmin,getAllAppointments)
adminRouter.post('/cancel-appointment',authAdmin,adminAppointmentCancelled)
adminRouter.get('/appointment-dashboard',authAdmin,adminDashoard)
export default adminRouter;
