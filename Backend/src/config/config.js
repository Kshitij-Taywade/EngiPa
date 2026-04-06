import mongoose from "mongoose"

import dotenv from "dotenv"

dotenv.config();


const config = {
    MONGO_URI: process.env.MONGO_URI,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    PORT: process.env.PORT
}
export default config;