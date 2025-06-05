import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
  try {
    const dtoken= req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!dtoken) {
      return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.docId = token_decode.id;
    console.log("docor id " ,req.docId) ;// Attach decoded doctor ID to request
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ success: false, message: "Token invalid or expired." });
  }
};

export default authDoctor;
