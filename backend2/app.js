const express = require("express");
require("dotenv").config();

const app = express();

app.listen(1000, () => {
    console.log("server has been started")
})