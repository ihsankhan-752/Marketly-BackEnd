import mongoose from "mongoose";

const { Schema } = mongoose;

const openingHoursSchema = new Schema(
  {
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
      },
    },
  },
  {
    _id: false,
  }
);

const storeBranchSchema = new Schema(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    phone: {
      type: String,
      trim: true,
    },

    openingHours: {
      monday: {
        type: openingHoursSchema,
        default: () => ({
          isEnabled: true,
          open: "09:00",
          close: "22:00",
        }),
      },

      tuesday: {
        type: openingHoursSchema,
        default: () => ({
          isEnabled: true,
          open: "09:00",
          close: "22:00",
        }),
      },

      wednesday: {
        type: openingHoursSchema,
        default: () => ({
          isEnabled: true,
          open: "09:00",
          close: "22:00",
        }),
      },

      thursday: {
        type: openingHoursSchema,
        default: () => ({
          isEnabled: true,
          open: "09:00",
          close: "22:00",
        }),
      },

      friday: {
        type: openingHoursSchema,
        default: () => ({
          isEnabled: true,
          open: "09:00",
          close: "22:00",
        }),
      },

      saturday: {
        type: openingHoursSchema,
        default: () => ({
          isEnabled: true,
          open: "09:00",
          close: "22:00",
        }),
      },

      sunday: {
        type: openingHoursSchema,
        default: () => ({
          isEnabled: false,
        }),
      },
    },

    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },

    isPrimary: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

storeBranchSchema.index({
  location: "2dsphere",
});

const StoreBranch = mongoose.model(
  "StoreBranch",
  storeBranchSchema
);

export default StoreBranch;
