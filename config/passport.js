const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function(passport) {
    //define the local strategy for email and password for authenticaltion
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        try {
            const user = await User.findOne({email});
            if(!user) {
                return done(null, false, {message: 'Incorrect email.'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect password.'});
            }
            //Authenticaltion is successful
            return done(null, user);
        } catch (error) {

            return done(error);
        }
    }));
   
    
    //serialize passport determines which data of the user should be stored in the session. 
    //here we store user id
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    //deserialize the user from the session based on his user id
    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};