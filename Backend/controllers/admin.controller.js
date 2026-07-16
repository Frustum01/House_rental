import User from "../models/UserSchema.js";
import Property from "../models/properties/properties.js";
import Booking from "../models/BookingSchema.js";
import Review from "../models/ReviewSchema.js";
import Category from "../models/properties/catogories.js";
import mongoose from "mongoose";
import Amenity from "../models/properties/aminities.js";

const dashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments({
            role: "user"
        });
        const hosts = await Property.distinct("owner");
        const totalHosts = await hosts.length;

        const totalProperties = await Property.countDocuments();

        const totalBookings = await Booking.countDocuments();

        const totalReviews = await Review.countDocuments();

        return res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalHosts,
                totalProperties,
                totalBookings,
                totalReviews
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
// get pending properties

const hostPendingProperty = async (req, res) => {
    try {

        const pendingProperties = await Property.find({
            status: "pending"
        })
        .populate("owner", "userName email profile_image")
        .populate("aminities", "name");

        if (pendingProperties.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No pending properties found.",
                pendingProperties: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Pending properties fetched successfully.",
            totalPending: pendingProperties.length,
            pendingProperties
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// admin approve property

const hostapprove = async(req,res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findById(id);
        if(!property){
            return res.status(404).json({
                message:"property does not exist"
            })
        }
        if(property.status == "approved"){
            return res.status(403).json({
                message:"already approved"
            })
        }
        property.status = "approved";
        await property.save();
        return res.status(200).json({
            message:"Approved your Property",
            property
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server error",
            error: error.message
        })
    }
}

//host reject the property

const hostreject = async(req,res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findById(id);
        if(!property){
            return res.status(404).json({
                message:"property does not exist"
            })
        }
        if(property.status == "approved"){
            return res.status(403).json({
                message:"already approved"
            })
        }
        if(property.status == "rejected"){
            return res.status(403).json({
                message:"already rejected"
            })
        }
        property.status = "rejected";
        await property.save();
        return res.status(200).json({
            message:"Rejected your Property",
            property
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server error",
            error: error.message
        })
    }
}

// all user data

const allUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password -__v");

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully.",
            totalUsers: users.length,
            users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

//
const adminBookings = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .populate("tenant", "userName phone profile_image")
            .populate("owner", "userName phone profile_image")
            .populate("property", "title city coverImage");

        return res.status(200).json({
            success: true,
            message: "Bookings fetched successfully.",
            totalBookings: bookings.length,
            bookings
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
// admin reviews

const adminReviews = async (req, res) => {
    try {

        const reviews = await Review.find()
            .populate("user", "userName profile_image")
            .populate("property", "title coverImage");

        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully.",
            totalReviews: reviews.length,
            reviews
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// block user

const block = async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        if(user.isActive){
            user.isActive = false;
            await user.save();
            return res.status(200).json({
                message:"user blocked successfully",
                user
            })
        }
        if(!user.isActive){
            user.isActive = true;
            await user.save();
            return res.status(200).json({
                message:"user unblocked successfully",
                user
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server error",
            error: error.message
        })
    }
}

// category delete

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }
        const propertyExists = await Property.findOne({
            category: id
        });
        if (propertyExists) {
            return res.status(400).json({
                success: false,
                message: "Category cannot be deleted because it is being used by properties."
            });
        }
        await category.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// edit category
const editCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const { name } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category id."
            });
        }
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required."
            });
        }
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }
        const categoryName = name.trim();

        if (category.name === categoryName) {
            return res.status(200).json({
                success: true,
                message: "No changes were made.",
                category
            });
        }


        const alreadyExists = await Category.findOne({
            name: categoryName
        });

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists."
            });
        }

        category.name = categoryName;

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

// add category

const addCategory = async (req, res) => {
    try {

        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required."
            });
        }

        const categoryName =
            name.trim().charAt(0).toUpperCase() +
            name.trim().slice(1);

        const alreadyExists = await Category.findOne({
            name: categoryName
        });

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists."
            });
        }

        const category = await Category.create({
            name: categoryName
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};


//add aminities
const addAminities = async(req,res)=>{
     try {

        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Aminities name is required."
            });
        }

        const Name =
            name.trim().charAt(0).toUpperCase() +
            name.trim().slice(1);

        const alreadyExists = await Amenity.findOne({
            name: Name
        });

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Amenity already exists."
            });
        }

        const amenities = await Amenity.create({
            name: Name
        });

        return res.status(201).json({
            success: true,
            message: "Amenity created successfully.",
            amenities
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

//edit aminities

const editAminities = async(req,res)=>{
    try {

        const { id } = req.params;
        const { name } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid aminities id."
            });
        }
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Amenity name is required."
            });
        }
        const aminities = await Amenity.findById(id);
        if (!aminities) {
            return res.status(404).json({
                success: false,
                message: "Amenity not found."
            });
        }
        const aminitiesName = name.trim();

        if (aminities.name === aminitiesName) {
            return res.status(200).json({
                success: true,
                message: "No changes were made.",
                aminities
            });
        }


        const alreadyExists = await Amenity.findOne({
            name: aminitiesName
        });

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Amenity already exists."
            });
        }

        aminities.name = aminitiesName;

        await aminities.save();

        return res.status(200).json({
            success: true,
            message: "Amenity updated successfully.",
            aminities
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
}

// delete aminities
const deleteAmenity = async (req, res) => {
    try {
        const { id } = req.params;

        const amenity = await Amenity.findById(id);

        if (!amenity) {
            return res.status(404).json({
                success: false,
                message: "Amenity not found."
            });
        }

        const propertyExists = await Property.findOne({
            amenities: id   // use the exact field name from your Property schema
        });

        if (propertyExists) {
            return res.status(400).json({
                success: false,
                message: "Amenity cannot be deleted because it is being used by properties."
            });
        }

        await amenity.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Amenity deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};



export { dashboard, hostPendingProperty, hostapprove, hostreject, allUsers, adminBookings,adminReviews, block , deleteCategory, editCategory, addCategory , addAminities, editAminities, deleteAmenity};