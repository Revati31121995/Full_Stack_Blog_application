const express = require("express");
const userRoutes = express.Router();
const User = require("../models/User");
const {getRegisterForm, register, getLoginForm, login, logout} = require("../controllers/authController");


//register route for form
userRoutes.get("/register", getRegisterForm)
//main logic for register
userRoutes.post("/register", register)



//login route for form
userRoutes.get("/login", getLoginForm)
//main logic for login
userRoutes.post("/login", login)

//logout route
userRoutes.get("/logout", logout)

module.exports = userRoutes;