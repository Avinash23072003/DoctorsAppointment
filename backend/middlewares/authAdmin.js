import jwt from 'jsonwebtoken'
const authAdmin=async(req,res,next)=>{

    const {atoken}=req.headers;
    try{
        if(!atoken){
           return res.json({sucess:false,message:"Not authorised login again"})
        }

        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET);
        if(token_decode != process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
           return  res.json({sucess:false,message:"Not authorised "})
        }
        next();
    }
   
    catch(error){
        console.log(error)
       return res.json({sucess:false,message:error.message})
    }
}
export default authAdmin;