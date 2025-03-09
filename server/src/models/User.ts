import mongoose from "mongoose";

interface IUserSchema {
  username: string;
  email: string;
  password: string;
  picture: string;
  savedCodes: Array<mongoose.Types.ObjectId>;
  isAdmin: boolean;
}

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/djizcuofs/image/upload/v1741525249/AST.jpg",
    },
    savedCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Code" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
