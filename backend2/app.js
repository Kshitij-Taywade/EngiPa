import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js"

dotenv.config();

connectDB();


const app = express();


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});