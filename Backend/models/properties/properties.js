import mongoose from "mongoose";
const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rent: {
      type: Number,
      required: true,
      min: 0,
    },
    deposit: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },  
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    area: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    coverImage: {
      type: String,
      required: true,
      trim:true,
    },
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const Property = mongoose.model("Property", propertySchema);
export default Property;