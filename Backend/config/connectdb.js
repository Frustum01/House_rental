import mongoose from "mongoose";
import dotebv from "dotenv";

const connect = async()=>{
    try{
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log("database is connected.....");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

export default connect;