import express from 'express';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import { adminLogin } from '../controllers/adminController.js';
import { allDoctors } from '../controllers/adminController.js';
const adminRouter = express.Router();
import authAdmin from '../middlewares/authAdmin.js';
import { changeDoctorAvailability } from '../controllers/doctorController.js';
// ✅ Fix: multer setup must be upload.single('image')
adminRouter.post('/add-doctor',  authAdmin,upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.post('/all-doctor',authAdmin,allDoctors)
adminRouter.post('/change-availibility',authAdmin,changeDoctorAvailability)
export default adminRouter;
