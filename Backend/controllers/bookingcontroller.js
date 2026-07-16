import express from "express"
import Property from "../models/properties/properties.js";
import mongoose from "mongoose";
import Booking from "../models/BookingSchema.js";

// booking request 

const applyBook = async(req,res)=>{
    try {
        const { property, message, startDate, endDate } = req.body;
        const bookproperty = await Property.findById(property);

        if(!bookproperty){
            return res.status(404).json({
                message:"cant find the property"
            });
        }

        if (bookproperty.owner.toString() === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot book your own property."
            });
        }
        

        if(!startDate || !endDate){
            return res.status(404).json({
                message:"fill the dates"
            });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = (end - start) / (1000 * 60 * 60 * 24);

        if (start >= end) {
            return res.status(400).json({
                message: "End date must be after start date."
            });
        }


        if(days<30){
            return res.status(400).json({
                message:"minimum booking of 30 days"
            }); 
        }

        const overlap = await Booking.findOne({
            property,
            status: "accepted",
            startDate: {
                $lte: endDate
            },
            endDate: {
                $gte: startDate
            }
        });


        if(overlap){
            return res.status(404).json({
                message:"Already booked for that date"
            });
        }

        const isCreated = await Booking.create({
            property,
            tenant:req.user._id,
            owner: bookproperty.owner,
            startDate,
            endDate,
            monthlyRent: bookproperty.rent,
            deposit: bookproperty.deposit,
            message,
            status:"pending",
        })

        return res.status(201).json({
            message:"created booking",
            isCreated
        })

        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

// My Bookings

const myBooking = async (req,res)=>{
    try {
        const bookings = await Booking.find({
            tenant: req.user._id
        })
        .populate("property", "title coverImage city rent")
        .populate("owner", "userName profile_image phone");

        if (bookings.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No bookings found.",
                bookings: []
            });
        }

        return res.status(200).json({
            success: true,
            message:"your bookings",
            bookings
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

//owner requests

const hostbookingspendiing = async (req,res)=>{
    try {
        const bookings = await Booking.find({
            owner: req.user._id,
            status:"pending"
        })
        .populate("property", "title coverImage city rent")
        .populate("tenant", "userName profile_image phone");

        if (bookings.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No bookings found.",
                bookings: []
            });
        }

        return res.status(200).json({
            success: true,
            message:"your bookings requests",
            bookings
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

const hostbookingsapproved = async (req,res)=>{
    try {
        const bookings = await Booking.find({
            owner: req.user._id,
            status:"approved"
        })
        .populate("property", "title coverImage city rent")
        .populate("tenant", "userName profile_image phone");

        if (bookings.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No bookings found.",
                bookings: []
            });
        }

        return res.status(200).json({
            success: true,
            message:"your bookings requests",
            bookings
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

// host approve booking

const hostApprove = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        if (booking.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to approve this booking"
            });
        }
        if (booking.status === "accepted") {
            return res.status(400).json({
                success: false,
                message: "Booking is already accepted"
            });
        }

        if (booking.status === "canclled") {
            return res.status(400).json({
                success: false,
                message: "Booking is cancleed by user"
            });
        }
        // Check if another accepted booking overlaps
        const overlap = await Booking.findOne({
            _id: { $ne: booking._id },
            property: booking.property,
            status: "accepted",
            startDate: {
                $lte: booking.endDate
            },
            endDate: {
                $gte: booking.startDate
            }
        });

        if (overlap) {
            return res.status(400).json({
                success: false,
                message: "Another booking has already been accepted for these dates."
            });
        }

        // Approve current booking
        booking.status = "accepted";
        await booking.save();

        // Reject all overlapping pending bookings
        await Booking.updateMany(
            {
                _id: { $ne: booking._id },
                property: booking.property,
                status: "pending",
                startDate: {
                    $lte: booking.endDate
                },
                endDate: {
                    $gte: booking.startDate
                }
            },
            {
                $set: {
                    status: "rejected"
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Booking accepted successfully.",
            booking
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// reject booking from host side

const hostReject = async(req,res)=>{
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        if (booking.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to approve this booking"
            });
        }
        if (booking.status === "approved") {
            return res.status(400).json({
                success: false,
                message: "Approved bookings cannot be rejected."
            });
        }
        if (booking.status === "rejected") {
            return res.status(400).json({
                success: false,
                message: "Booking is already rejected"
            });
        }
        booking.status = "rejected";
        await booking.save();
        return res.status(200).json({
            success: true,
            message: "Booking rejected successfully.",
            booking
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


// tenant cancle booking

const tenantCancle = async(req,res)=>{
    try {
        const {id} = req.params;
        const booking = await Booking.findOne({
            _id : id,
            status : "pending"
        })
        
        if(!booking){
            return res.status(404).json({
                message:"can find booking or rejected"
            })
        }
        if (booking.tenant.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to cancle this booking"
            });
        }
        booking.status = "cancelled";
        await booking.save();
        return res.status(200).json({
            message:"Booking cancled",
            booking
        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error :error.message
        })
    }
}

export { applyBook, myBooking, hostbookingspendiing, hostbookingsapproved, hostApprove, hostReject, tenantCancle}

