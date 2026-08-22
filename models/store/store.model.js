import mongoose, { Schema } from "mongoose";
import { storeStatus } from "../../utils/enums.js";
const workingDaySchema = Schema({
    isEnabled: {
        type: Boolean,
        default: true,
    },
    open: {
        type: String,
        required: function () {
            return this.isEnabled;
        },
    },
    close: {
        type: String,
        required: function () {
            return this.isEnabled;
        }
    }
})
const storeSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storeType: {
        type: Schema.Types.ObjectId,
        ref: "StoreType",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    logo: {
        type: String,
        default: "",
    },
    coverImage: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: storeStatus,
        default: storeStatus[0]
    },
    workingHours: {
        monday: {
            type: workingDaySchema,
            default: () => ({ isEnabled: true, open: "09:00", close: "22:00" })
        },
        tuesday: {
            type: workingDaySchema,
            default: () => ({ isEnabled: true, open: "09:00", close: "22:00" })
        },
        wednesday: {
            type: workingDaySchema,
            default: () => ({ isEnabled: true, open: "09:00", close: "22:00" })
        },
        thursday: {
            type: workingDaySchema,
            default: () => ({ isEnabled: true, open: "09:00", close: "22:00" })
        },
        friday: {
            type: workingDaySchema,
            default: () => ({ isEnabled: true, open: "09:00", close: "22:00" })
        },
        saturday: {
            type: workingDaySchema,
            default: () => ({ isEnabled: true, open: "09:00", close: "22:00" })
        },
        sunday: {
            type: workingDaySchema,
            default: () => ({ isEnabled: false })
        }
    },


    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    reviewCount: {
        type: Number,
        default: 0,
        min: 0,
    },

    deliveryEnabled: {
        type: Boolean,
        default: true,
    },

    pickupEnabled: {
        type: Boolean,
        default: true,
    },

    settings: {
        type: Schema.Types.Mixed,
        default: {},
    },
},
    {
        timestamps: true,

    })

const StoreSchema = mongoose.model("Store",storeSchema);

export default StoreSchema;