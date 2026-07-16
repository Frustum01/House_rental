import express from "express"
import dotenv from "dotenv/config"
import connect from "./config/connectdb.js"
import router from "./routes/userRoutes.js"
import User from "./models/UserSchema.js"
import Session from "./models/SessionSchema.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import uploadRoutes from "./routes/upload.routes.js";
import category from "./models/properties/catogories.js"
import Property from "./models/properties/properties.js"
import Aminities from "./models/properties/aminities.js"
import Host from "./routes/propertyroutes.js"
import Booking from "./models/BookingSchema.js"
import Bookingroutes from "./routes/Boojingroutes.js"
import wishListModel from "./models/wishlist.js"
import wiishListroutes from "./routes/Wishroutes.js"
import Review from "./models/ReviewSchema.js"
import reviewroutes from "./routes/Reviewsroutes.js"
import Adminroutes from "./routes/Adminroutes.js"

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/user", router);
app.use("/api/upload", uploadRoutes);
app.use("/",Host);
app.use("/Booking",Bookingroutes);
app.use("/wish",wiishListroutes)
app.use("/review",reviewroutes)
app.use("/admin",Adminroutes)

Session();
connect();

app.listen(process.env.PORT,()=>{console.log(`Server is running on port ${process.env.PORT}`)})