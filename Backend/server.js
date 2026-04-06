import app from "./src/app.js"
import connectDB from "./src/config/database.js";
import config from "./src/config/config.js"
import dotenv from "dotenv"


connectDB();



app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});