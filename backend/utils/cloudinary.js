import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();


cloudinary.config({

    cloud_name: process.env.Cloud_name,
    api_key: process.env.API_key,
    api_secret: process.env.API_secret

});

export default cloudinary;
