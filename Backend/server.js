console.log("1️⃣ Server file started");

import app from "./src/app.js";
console.log("2️⃣ App imported");

import connectDB from "./src/config/database.js";
console.log("3️⃣ DB file imported");

import dotenv from "dotenv";
dotenv.config();
console.log("4️⃣ Env loaded");

connectDB();
console.log("5️⃣ DB connection callaed");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`6️⃣ Server started on port ${PORT}`);
});