import Category from "../../models/properties/catogories.js";
import Amenity from "../../models/properties/aminities.js";
import Property from "../../models/properties/properties.js"
import { uploadToCloudinary } from "../../utils/cloudinary.js";

const postProperty = async (req,res)=>{
    try {
        console.log(req.body);
console.log(req.files);
console.log(req.body.amenities);
console.log(Array.isArray(req.body.amenities));
        const {
            title,
            description,
            rent,
            deposit,
            category,
            city,
            state,
            address,
            pincode,
            bedrooms,
            bathrooms,
            area,
            amenities,
        } = req.body;

        if (
            !title ||
            !description ||
            !rent ||
            !category ||
            !city ||
            !state ||
            !address ||
            !pincode ||
            !bedrooms ||
            !bathrooms ||
            !area
        ) {
            return res.status(404).json({
            success: false,
            message: "All fields are required",
        });
        }


        const owner = req.user._id;
        const checkCategory = await Category.findById(category);
        if(!checkCategory){
            return res.status(404).json({
                message:"not invalid category"
            });
        }


        const amenityIds = amenities || [];

        const checkAmenities = await Amenity.find({
            _id: { $in: amenityIds }
        });

        if (checkAmenities.length !== amenityIds.length) {
            return res.status(404).json({
                success: false,
                message: "Invalid amenities selected"
            });
        }


        const coverImage = req.files?.coverImage?.[0];

        if (!coverImage) {
            return res.status(404).json({
                success: false,
                message: "Cover image is required"
            });
        }

        const coverResult = await uploadToCloudinary(
            coverImage.buffer,
            "rently/coverImage"
        );

        const gallery = req.files?.images || [];

        const imageUrls = [];
        for (const image of gallery) {
            const result = await uploadToCloudinary(
                image.buffer,
                "rently/propertyImage"
            );
            imageUrls.push(result.secure_url);
        }


        const property = await Property.create({
            title,
            description,
            rent,
            deposit,

            category,
            owner,

            city,
            state,
            address,
            pincode,

            bedrooms,
            bathrooms,
            area,

            amenities,

            coverImage: coverResult.secure_url,

            images: imageUrls,
        });

        return res.status(201).json({
            success: true,
            message: "Property created successfully",
            property,
        });   

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}

const hostMyProperty = async (req,res)=>{
    try {
        const myProperty = await Property.find({
            owner:req.user._id
        });
        return res.status(200).json({
            message:"perfect",
            myProperty
        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }

}

const hostSingle = async(req,res) =>{
    try {
        const {id} = req.params;
        const detailOne = await Property.findOne({
            _id: id,
            owner: req.user._id})
        if(!detailOne){
            res.status(404).json({
            message:"not dot property",
        })
        }
        res.status(200).json({
            message:"done",
            detailOne
        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error
        })
    }
}


const editMuProperty = async (req,res)=>{
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).json({
                message:"no property with this id found"
            })}
        const property = await Property.findOne({
            _id: id,
            owner: req.user._id
        });
        if(!property){
            return res.status(404).json({
                message:"no"
            })}
        console.log(req.body)
        const {
            title,
            description,
            rent,
            deposit,
            category,
            city,
            state,
            address,
            pincode,
            bedrooms,
            bathrooms,
            area,
            amenities,
        } = req.body;


        if(title){
            property.title = title;
        };
        if(description){
            property.description = description;
        };
        if(rent){
            property.rent = Number(rent);
        };
        if(deposit){
            property.deposit = Number(deposit);
        };
        if(category){
            property.category = category;
        };
        if(city){
            property.city = city;
        };
        if(state){
            property.state = state;
        };
        if(address){
            property.address = address;
        };
        if(pincode){
            property.pincode =Number(pincode);
        };
        if(bedrooms){
            property.bedrooms = Number(bedrooms);
        };
        if(bathrooms){
            property.bathrooms = Number(bathrooms);
        };
        if(area){
            property.area = Number(area);
        };
        if(amenities){
            property.amenities = amenities;
        };

        const coverImage = req.files?.coverImage?.[0];

        if (coverImage) {
            const coverResult = await uploadToCloudinary(
                coverImage.buffer,
                "rently/coverImage"
            );

            property.coverImage = coverResult.secure_url;
        }

        const gallery = req.files?.images || [];

        if (gallery.length > 0) {
            const imageUrls = [];

            for (const image of gallery) {
                const result = await uploadToCloudinary(
                    image.buffer,
                    "rently/propertyImage"
                );

                imageUrls.push(result.secure_url);
            }

            property.images = imageUrls;
        }

        await property.save();

        return res.status(200).json({
            success: true,
            message: "Property updated successfully",
            property,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal Server Error",
            error:error.message
        });
        
    }
}

// delete

const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const property = await Property.findOne({
            _id: id,
            owner: req.user._id,
        });

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }

        await property.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Property deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




export {postProperty,hostMyProperty, hostSingle, editMuProperty, deleteProperty}