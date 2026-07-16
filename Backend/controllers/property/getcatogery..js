import Category from "../../models/properties/catogories.js";
import Amenity from "../../models/properties/aminities.js";

// Get All Categories
const getAllCategories = async (req, res) => {
    try {

        const categories = await Category.find().sort({ name: 1 });

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully.",
            totalCategories: categories.length,
            categories
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

// Get All Amenities
const getAllAmenities = async (req, res) => {
    try {

        const amenities = await Amenity.find().sort({ name: 1 });

        return res.status(200).json({
            success: true,
            message: "Amenities fetched successfully.",
            totalAmenities: amenities.length,
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

export {
    getAllCategories,
    getAllAmenities
};