const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport")

//Register Logic for rendering form
exports.getRegisterForm = (req, res) => {
    res.render("../views/register.ejs", { error: null, title: "Register", user: req.user });
}


//Main logic for register
exports.register = async (req, res) => {
const {username, email, password} = req.body;
try {
    //check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.render("register", {
            title: "Register",
            error: "User already exists",
            user: req.user
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    //save user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    res.redirect("/auth/login");

} catch (error) {
    res.render("register",{
        title: "Register",
        user: req.username,
        error: error.message
    })
}
}

//Login Logic for rendering form
exports.getLoginForm = (req, res) => {
    console.log(req.user);
    res.render("../views/login.ejs", {
        error: "",
        title: "Login",
        user: req.user
    });
}

//Main logic for login
exports.login = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render("login",{
                title: "Login",
                user: req.user,
                error: info.message
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/");
        });
    })(req, res, next);
}

//logout
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/auth/login");
    });
}