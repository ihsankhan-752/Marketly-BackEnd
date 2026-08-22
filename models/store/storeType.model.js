import mongoose,{Schema} from "mongoose";

const storeTypeSchema = Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    description:{
        type:String,
        trim:true,
    },
    icon:{
        type:String,
        default:null,
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    }
},{
    timestamps:true
});

const StoreType = mongoose.model("StoreType",storeTypeSchema);

export default StoreType;
