import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoose.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
const app=express();
const port = process.env.PORT || 4000;
//middleware

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors())
connectDB()
connectCloudinary()
app.get('/',(req,res)=>{
    res.send('Api is working fine')
})
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }));
// localhost:4000/api/admin/addDoctor
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api/admin', adminRouter);
app.use('/api/doctor',doctorRouter );
app.use('/api/users',userRouter );
app.listen(port,()=>console.log('App is listening on port',port));

