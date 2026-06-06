import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  user: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const AddressModel = mongoose.model("Address", addressSchema);
