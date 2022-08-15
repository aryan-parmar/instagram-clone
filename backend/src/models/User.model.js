const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: { type: String, unique: true, required: true },
  FullName: { type: String, default: null },
  Email: { type: String, unique: true },
  Password: { type: String,required: true },
  token: { type: String },
  ProfilePicture: { type: String, default: '/usercontent/profile/default.jpg' },
  CreatedAt: { type: Date, default: Date.now },
  Private: { type: Boolean, default: true },
  Follower: { type: Array, default: [] },
  Following: { type: Array, default: [] },
  Posts: { type: Array, default: [] },
  PendingRequest : { type: Array, default: [] },
  Bio: { type: String, default: '' },
});

module.exports = mongoose.model("user", userSchema);