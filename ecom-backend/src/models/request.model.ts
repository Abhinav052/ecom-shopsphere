import mongoose, { Schema } from "mongoose";

export interface SellerRequestDocument extends Document {
  userId: String;
  sellerName: String;
  contact: String;
  requestType: String;
  isPending: Boolean;
}

const requestSchema: Schema<SellerRequestDocument> = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  requestType: {
    type: String,
    required: true,
  },
  isPending: {
    type: Boolean,
    default: true,
  },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
