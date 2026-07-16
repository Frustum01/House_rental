import Property from "../models/properties/properties.js";
import Review from "../models/ReviewSchema.js";
import Booking from "../models/BookingSchema.js";

export const getReviews = async (req, res) => {
    try {
        const { id } = req.params;

        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        const reviews = await Review.find({
            property: id
        })
        .populate("user", "userName profile_image");

        return res.status(200).json({
            success: true,
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

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this review"
            });
        }

        if (rating) {
            review.rating = rating;
        }

        if (comment) {
            review.comment = comment;
        }

        await review.save();

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this review"
            });
        }

        await review.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const submitReview = async (req, res) => {
    try {

        const { property, rating, comment } = req.body;

        if (!property || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const propertyExists = await Property.findById(property);

        if (!propertyExists) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        // Only booked users can review
        const booking = await Booking.findOne({
            tenant: req.user._id,
            property,
            status: "approved"      // or "completed"
        });

        if (!booking) {
            return res.status(403).json({
                success: false,
                message: "You can review only booked properties."
            });
        }

        // One review per user
        const alreadyReviewed = await Review.findOne({
            user: req.user._id,
            property
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this property."
            });
        }

        const review = await Review.create({
            user: req.user._id,
            property,
            rating,
            comment
        });

        return res.status(201).json({
            success: true,
            message: "Review submitted successfully.",
            review
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};