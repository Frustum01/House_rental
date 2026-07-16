import Property from "../../models/properties/properties.js"

const getProperties = async (req,res)=>{
    try {
        const {
            search,
            category,
            bedrooms,
            bathrooms,
            minRent,
            maxRent,
            amenities,
            page = 1,
            limit = 12,
        } = req.query;

        const filter = {
            status: "approved",
        };

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    address: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    city: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    state: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }


        if (category) {
            filter.category = category;
        }

        if (bedrooms) {
            filter.bedrooms = Number(bedrooms);
        }

        if (bathrooms) {
            filter.bathrooms = Number(bathrooms);
        }

        if (minRent || maxRent) {
            filter.rent = {};

            if (minRent) {
                filter.rent.$gte = Number(minRent);
            }

            if (maxRent) {
                filter.rent.$lte = Number(maxRent);
            }
        }

        if (amenities) {
            filter.amenities = {
                $in: Array.isArray(amenities)
                    ? amenities
                    : [amenities],
            };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const properties = await Property.find(filter)
            .populate("category")
            .populate("owner", "name profile_image")
            .populate("amenities")
            .skip(skip)
            .limit(Number(limit));

        const totalProperties = await Property.countDocuments(filter);

        return res.status(200).json({
            success: true,
            totalProperties,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProperties / Number(limit)),
            properties,
        });

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
};


// get single property

const getSingle =  async(req,res)=>{
    try {

        const { id } = req.params;
        if(!id){
            return res.status(404).json({
                message:"invalid property"
            })
        };
        const tapproperty = await Property.findById(id)
        .populate("category")
        .populate("owner","name")
        .populate("amenities")
        return res.status(200).json({
            message:"Got the property",
            tapproperty
        });
        } catch (error) {
            return res.status(500).json({
                message:"internal server error",
                error:error.message
            })    
    }
}

export {getProperties,getSingle}