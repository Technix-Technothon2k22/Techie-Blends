import { catchAsync } from "../utils";
import User from "../models/user";
import { CustomErrorHandler } from "../utils";
import jwt from "jsonwebtoken";
import Advisor from "../models/advisor";

export const isLoggedIn = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new CustomErrorHandler(401, "You are not logged in"));
  }

  const { id, role, email, name } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(id, {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });

  if (!user) {
    return next(new CustomErrorHandler(401, "Please login to continue"));
  }
  req.user = user;

  next();
});

export const customRole = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomErrorHandler(401, "You are not authorized to perform this action"));
    }
    next();
  });
};
