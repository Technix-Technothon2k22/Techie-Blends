// Email,
// Name,
// Advisors following list
// ,Liked categories(max-5),
// Community chatroomsid
// ,age
// ,gender
// ,Health issues

import mongoose from "mongoose";

const DetailSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  email: {
    type: String,
  },
  name: {
    type: String,
  },
  categories: {
    type: Array,
  },
  chatrooms: {
    type: Array,
  },
  healthIssues: {
    type: Array,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
});

const userDetails = mongoose.model("UserDetails", DetailSchema);

export default userDetails;
