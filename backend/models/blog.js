import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: [
      {
        url: String,
      },
    ],

    advisor: {
      type: ObjectId,
      ref: "Advisors",
    },
    likes: [
      {
        id: {
          type: String,
        },
      },
    ],
    dislikes: [
      {
        id: {
          type: String,
        },
      },
    ],
    category: {
      type: String,
    },
    date: {
      type: String,
    },
    type: {
      type: String,
    },
    feedbacks: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blogs", BlogSchema);

export default Blog;
