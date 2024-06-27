import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error: "Unauthorized - No token provided."});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid token."});
        }
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({error: "User not found."});
        }
        req.user = user;
        next();
    }catch(err) {
        res.status(500).json({error: "Internal server error."});
    }
}

export default protectRoute;