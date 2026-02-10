const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        public_id: String,
    },
    bio:{
        type: String,
        default: "",
        max: 1000
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
},{
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;