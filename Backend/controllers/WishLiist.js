import Property from "../models/properties/properties.js";
import Wishlist from "../models/wishlist.js";

export const addWishlist = async (req, res) => {
    try {
        const { property } = req.body;

        if (!property) {
            return res.status(400).json({
                success: false,
                message: "Property is required."
            });
        }

        const propertyExists = await Property.findById(property);

        if (!propertyExists) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        const alreadyAdded = await Wishlist.findOne({
            user: req.user._id,
            property
        });

        if (alreadyAdded) {
            return res.status(400).json({
                success: false,
                message: "Property already exists in wishlist."
            });
        }

        const wishlist = await Wishlist.create({
            user: req.user._id,
            property
        });

        return res.status(201).json({
            success: true,
            message: "Property added to wishlist.",
            wishlist
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// get my list

export const getWishlist = async (req, res) => {
    try {

        const wishlist = await Wishlist.find({
            user: req.user._id
        })
        .populate("property");

        return res.status(200).json({
            success: true,
            message: "Wishlist fetched successfully.",
            wishlist
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// remove list

export const removeWishlist = async (req, res) => {
    try {

        const { propertyId } = req.params;

        const wishlist = await Wishlist.findOne({
            user: req.user._id,
            property: propertyId
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Property not found in wishlist."
            });
        }

        await wishlist.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Property removed from wishlist."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};