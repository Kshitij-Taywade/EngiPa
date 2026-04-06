import app from "./src/app.js"
import connectDB from "./src/config/database.js";
import config from "./src/config/config.js"
import dotenv from "dotenv";
dotenv.config();


connectDB();



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});