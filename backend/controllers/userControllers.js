import { catchAsync, CustomErrorHandler } from "../utils";
import User from "../models/user";

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = catchAsync(async (req, res) => {
  var query = require("url").parse(req.url, true).query;

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public

module.exports = { allUsers };
