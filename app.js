const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const User = require("./models/User");
const userRoutes = require("./routes/authRoutes");
const passport = require("passport");
const session = require("express-session")
const MongoStore = require("connect-mongo")

const PORT = process.env.PORT || 3000;

//middleware

app.use(
  session({
    secret: "Keyboard cat",
    resave: false,
    saveUninitialized: false
  })
)



app.use(express.urlencoded({ extended: true }));
//EJS
app.set("view engine", "ejs");

//session middleware

//passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/auth", userRoutes);



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