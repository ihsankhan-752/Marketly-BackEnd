import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profileImage: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "storeOwner", "admin", "rider"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("User", userSchema);
