import jwt from 'jsonwebtoken'
const authUser = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not authorized, login again" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      req.userId = decoded.id; // ✅ Correct!
      console.log("🔐Middleware - userId set on req:", req.userId);
  
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };


export default authUser;
  