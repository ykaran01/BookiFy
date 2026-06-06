import dotenv  from 'dotenv'
dotenv.config()
import App from './src/app.js'
import { connectDB } from './src/db/connectDb.js'
const PORT =  5000 
connectDB()
App.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}) 

