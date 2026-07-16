import mongoose from "mongoose";

    const schema = await new mongoose.Schema({
    "name": {"type":String, "required":true,"trim":true},
    "email": {"type":String, "required":true,"trim":true, "unique":true},
    "password": {"type":String, "required":true,"trim":true},
    "phone": {"type":Number, "required":true,"trim":true},
    "profile_image":{"type":String,trim:true,default:"no profile"},
    "isActive":{"type":Boolean,default:true},
    "role":{"type":String,default:"user"},
    "createdat": {"type":Date, "default":Date.now},
    "updatedat": {"type":Date, "default":Date.now}
});

console.log("Schema is created for user.....");
const User = mongoose.model("User", schema);
export default User;