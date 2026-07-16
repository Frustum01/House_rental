import mongoose from "mongoose";
const categaryschema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        unique:true
    }
});
console.log("Schema created for catogery");
const Category = mongoose.model("Category",categaryschema);
export default Category;