import mongoose from "mongoose";
// Email
// Name
// Gender
// Qualification
// Area of expertise
// Blogs:[]
// Rating
// Reviews

const AdvisorSchema = new mongoose.Schema({
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
  areaOfExpertise: {
    type: Array,
  },
  chatrooms: {
    type: Array,
  },
  qualification: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  blogs: {
    type: Array,
  },
  ratings: {
    type: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        rating: Number,
      },
    ],
  },
  avgRating: {
    type: Number,
  },
  reviews: {
    type: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        review: String,
      },
    ],
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  verified: {
    type: String,
    enum: ["notfilled", "submitted", "verified", "rejected"],
    default: "notfilled",
  },
});

const Advisor = mongoose.model("Advisors", AdvisorSchema);

export default Advisor;
