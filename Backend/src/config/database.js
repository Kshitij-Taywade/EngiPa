import mongoose from "mongoose"
import config from "./config.js"


const connectDB = async() => {

    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to DB")
    } catch (e) {
        console.log(e)

    }
}
export default connectDB;