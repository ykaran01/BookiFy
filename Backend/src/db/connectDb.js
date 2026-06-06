import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const connection  = await  mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log('Database is connected')
    }catch(err){
        console.log('database is not connected',err.message);
        
    }
}