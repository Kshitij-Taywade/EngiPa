import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js"
import cors from "cors"
import router from "./src/router/api.js"

dotenv.config();
connectDB();
const app = express();
app.use(cors());

app.use("/", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});