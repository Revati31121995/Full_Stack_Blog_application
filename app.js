const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const User = require("./models/User");

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
//EJS
app.set("view engine", "ejs");


//register route for form
app.get("/auth/register", (req, res) => {
    res.render("../views/register.ejs");
    //res.json({message: "Register"});
});
//main logic for register
app.post("/auth/register", async (req, res) => {
const {username, email, password} = req.body;
try {
    //check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.send("User already exists");
    }else{
        const newUser = new User({username, email, password});
        await newUser.save();  
        res.redirect("/auth/login"); 
    }    

} catch (error) {
    console.log(error);
    res.send("User registration failed");
}
});



//login route for form
app.get("/auth/login", (req, res) => {
    res.render("../views/login.ejs");
});
//main logic for login
app.post("/auth/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        const isMatch = await User.findOne({password});
        if(user && isMatch){
            res.send("Login successful");
        }
        else{
            res.send("Login failed");
        }
        
    } catch (error) {
        console.log(error);
        res.send("Login failed");
    }
});

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


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});