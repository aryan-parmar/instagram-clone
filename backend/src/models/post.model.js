const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new mongoose.Schema({
    User_id: { type: String, required: true, ref: 'user' },
    PostImage: { type: String, required: true },
    Caption: { type: String },
    Likes: { type: Number, default: 0 },
    LikedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    Comments: { type: Array, default: [] },
    CommentCount: { type: Number, default: 0 },
    Date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("post", postSchema);