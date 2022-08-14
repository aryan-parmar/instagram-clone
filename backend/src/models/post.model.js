const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    User_id: { type: String, required: true, unique: true },
    PostImage: { type: String, required: true },
    Likes: { type: Number, default: 0 },
    LikedBy: { type: Array, default: [] },
    Comments: { type: Array, default: [] },
    CommentCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("post", postSchema);