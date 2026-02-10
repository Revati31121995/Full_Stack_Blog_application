const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

//connect mongo
mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
    console.log(`Server is running on port ${PORT}`);
    console.log("MongoDB connected");
})
.catch(()=>{
    console.log("MongoDB connection error");
});

//start the server


