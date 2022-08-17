const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  Username: { type: String, unique: true, required: true },
  FullName: { type: String, default: null },
  Email: { type: String, unique: true },
  Password: { type: String,required: true },
  token: { type: String },
  ProfilePicture: { type: String, default: '/usercontent/profile/default.jpg' },
  CreatedAt: { type: Date, default: Date.now },
  Private: { type: Boolean, default: true },
  Follower: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  Following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  Posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  PendingRequest : [{ type: Schema.Types.ObjectId, ref: 'user' }],
  Bio: { type: String, default: '' },
});

module.exports = mongoose.model("user", userSchema);