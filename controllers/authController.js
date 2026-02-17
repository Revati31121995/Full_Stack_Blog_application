
const User = require("../models/User");

//Register Logic for rendering form
exports.getRegisterForm = (req, res) => {
    res.render("../views/register.ejs");
}


//Main logic for register

exports.register = async (req, res) => {
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
}

//Login Logic for rendering form
exports.getLoginForm = (req, res) => {
    res.render("../views/login.ejs");
}

//Main logic for login
exports.login = async (req, res) => {
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
}
