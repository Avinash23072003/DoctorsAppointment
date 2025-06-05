import express from 'express'
import { doctorList,loginDoctor,appointmentDoctor,appointmentComplete,appointmentCancel,docDashData ,docProfile,
  updateDocData} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
const doctorRouter=express.Router();
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashBoard',authDoctor,docDashData)
doctorRouter.get('/docProfile',authDoctor,docProfile);
doctorRouter.post('/update-profile',authDoctor,updateDocData)
export default doctorRouter;