import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../utils/constants/user.constants";
export interface UserDocument extends Document {
  email: String;
  password: String;
  role: String;
  //   wishlistID: mongoose.Types.ObjectId
}

const UserSchema: Schema<UserDocument> = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: Role.buyer,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
