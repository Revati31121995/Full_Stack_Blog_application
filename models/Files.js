const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    public_id:{
        type: String,
        required: true
    },
    uploaded_by:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
},{
    timestamps: true
});

const Files = mongoose.model("User", UserSchema);
module.exports = Files;