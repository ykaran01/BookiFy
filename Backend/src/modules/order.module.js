
import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    username:{
        type:String,
        deafult:"",
    },
    item: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },

    shippingFee: {
        type: Number,
        default: 10
    },

    orderStatus: {
        type: String,
        enum: ["delivered", "cancelled", "confirmed", "pending"],
        default: "pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    phoneNumber:{
        type:Number,
        require:true,
    },
   razorpayOrderId: String,
    paymentStatus:{
        type:String,
        enum:["pending","done"]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    
    },
    expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 20 * 60 * 1000),
  },
    deliveredAt: Date,
    

});

export const orderModel = mongoose.model("Order", orderSchema);
orderSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);