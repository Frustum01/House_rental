import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const authMiddleware = async (req,res,next)=>{
    try {
        const authheader = req.headers.authorization;
        if(!authheader){
            return res.status(401).json({message: "not get from bearer"});
        }
        const token = authheader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id);
        if(!user){
            return res.status(401).json({message:"user not found"});
        }
        if(!user.isActive ){
            return res.status(401).json({message:"user is blocked"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export default authMiddleware  