import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const uploadOnCloudinary = async (localfilepath) => {
               
    try {

        if (!localfilepath) return null;

        const response =
            await cloudinary.uploader.upload(
                localfilepath,
                {
                    resource_type: "auto"
                }
            );
        return response;

    } catch (error) {
        throw error;

    } finally {

        if (
            localfilepath &&
            fs.existsSync(localfilepath)
        ) {
            fs.unlinkSync(localfilepath);
        }
    }
};

export default uploadOnCloudinary;