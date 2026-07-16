import bcrypt from "bcrypt";
import User from "../models/UserSchema.js";
import SessionModel from "../models/SessionSchema.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";



const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
                
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password Hashed");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone
        });

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        await SessionModel.create({
            user: user._id,
            refreshToken: refreshTokenHash,
            ip: req.ip,
            useragent: req.headers["user-agent"]
        });

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        const userData = user.toObject();

        delete userData.password;

        return res.status(201).json({
            message: "User created successfully",
            accessToken,
            user: userData
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};



const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }
        if (!user.isActive) {
            return res.status(403).json({
                message: "User is blocked"
            });
        }
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        await SessionModel.updateMany({user: user._id, ip: req.ip, useragent: req.headers["user-agent"], revoked: false},{revoked: true});


        await SessionModel.create({
            user: user._id,
            refreshToken: refreshTokenHash,
            ip: req.ip,
            useragent: req.headers["user-agent"]
        });

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            message: "Login Successful",
            accessToken,
            user: userData
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });

    }
};



const logoutUser = async (req, res) => {

    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh Token not found"
            });
        }

        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const session = await SessionModel.findOne({
            refreshToken: refreshTokenHash,
            revoked: false
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        session.revoked = true;

        await session.save();

        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });

    }
};

const genrateAccess= async (req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({
            message:"Unothorized User"
        })
    }
        const decoded = jwt.verify(refreshToken,process.env.JWT_SECRET);
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await SessionModel.findOne({
        refreshToken: refreshTokenHash,
        revoked:false
    });

    if(!session){
        return res.status(401).json({message:"not login"});
    }
    const user = await User.findById(session.user)
    if(!user){return res.status(401).json({message:"user not found"})};

    const accessToken = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"15m"}
    );

    return res.status(200).json({message:"created new tocken",accessToken});
    } catch (error) {
        res.send(500).json(error.message)
    }
}


// forgot the password

const forgotPassword=(req,res)=>{
    try {
        const email = req.body;
        const isRegister = User.findOne({
            email
        })
        if(!isRegister){
            return res.status("404").json({"message":"email not found"})
        }
        isRegister.pass
    } catch (error) {
        
    }
}

    const getprofile = (req, res) => {
        return res.status(200).json({
            user: req.user
        });
    };
export {
    createUser,
    loginUser,
    logoutUser,
    genrateAccess,
    forgotPassword,
    getprofile
};