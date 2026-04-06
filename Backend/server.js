import app from "./src/app.js"
import connectDB from "./src/config/database.js";

connectDB();


app.listen(8000, () => {
    console.log('sercer has been started');
})