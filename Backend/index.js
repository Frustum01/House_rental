import express from "express"
import dotenv from "dotenv"
import connect from "./config/connectdb.js"
import router from "./routes/userRoutes.js"
import User from "./models/UserSchema.js"
import Session from "./models/SessionSchema.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use("/user", router)


Session();
connect();

app.listen(process.env.PORT,()=>{console.log(`Server is running on port ${process.env.PORT}`)})