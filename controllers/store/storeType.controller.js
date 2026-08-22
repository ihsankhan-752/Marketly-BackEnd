
import StoreType from "../../models/store/storeType.model.js";
import asyncHandler from "../../utils/async.handler.js";
import ApiResponse from "../../utils/api.response.js";
import ErrorHandler from "../../utils/error.handler.js";


export const createStoreType = asyncHandler(
    async function(req,res,){

        const {name,description,icon} = req.body;
        const existingStoreType = await StoreType.findOne({name:name.trim()});
        if(existingStoreType) throw new ErrorHandler("Store Type already exists",409);
        const storeType = await StoreType.create({name,description,icon});

        return res.json(new ApiResponse(200,{message:"Store Type added",data:storeType}));

    }
)

export const getStoreTypes = asyncHandler(
    async function(req,res){
        const storeTypes = await StoreType.find({isActive:true});

        return res.json(new ApiResponse(200,{
      message: "Store Types fetched successfully",data:storeTypes}));
    }
)