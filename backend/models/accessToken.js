import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    accessToken: { type: String, unique: true },
  },
  { timestamps: false }
);

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 });

const accessToken = mongoose.model("accessToken", tokenSchema);

export default accessToken;
