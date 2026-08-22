import mongoose from "mongoose";

const { Schema } = mongoose;

const storeSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    storeTypeId: {
      type: Schema.Types.ObjectId,
      ref: "StoreType",
      required: true,
      index: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },

    coverImage: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "suspended",
        "closed",
      ],
      default: "pending",
      required: true,
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
      required: true,
    },

    pickupEnabled: {
      type: Boolean,
      default: true,
      required: true,
    },

    settings: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;