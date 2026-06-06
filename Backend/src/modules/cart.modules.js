import mongoose from 'mongoose'
const cartSchema  = new mongoose.Schema({
    user: {
    type:String,
    required:true
  },
   items:[
     {product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    },
    quantity:{
        type:Number,
        default:0
    }}
   ],
   totalPrice:{
    type:Number,
    default:0
   }

},{timestamps: true})
export default mongoose.model('cart',cartSchema)