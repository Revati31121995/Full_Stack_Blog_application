const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    content:{
        type: String,
        default: "",
        max: 1000
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    images:[{
        url:{
            type: String,
            required: true
        },
        public_id:{
            type: String,
            required: true
        }
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
},{
    timestamps: true
});

const Posts = mongoose.model("User", UserSchema);
module.exports = Posts;