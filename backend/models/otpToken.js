import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    otpToken: { type: Number },
  },
  { timestamps: true }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 10 });

const OtpToken = mongoose.model("otpToken", otpSchema);

export default OtpToken;
