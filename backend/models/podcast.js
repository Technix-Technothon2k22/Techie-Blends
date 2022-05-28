import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const PodcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    link: {
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

    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Advisor = mongoose.model("Podcast", PodcastSchema);

export default Advisor;
