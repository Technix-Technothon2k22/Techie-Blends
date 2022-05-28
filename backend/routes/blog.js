import express from "express";
var router = express.Router();

import {
  createBlog,
  getAllFilteredBlogs,
  getBlogById,
  createFeedback,
  getFeedbackByBlog,
  ReactToBlog,
} from "../controllers/blog";

import { isLoggedIn, customRole } from "../middlewares/index";

router.post("/create", createBlog);
router.post("/getAll", getAllFilteredBlogs);
router.get("/getOne/:blogId", getBlogById);

router.post("/operations/:id", ReactToBlog);
router.post("/createfeed", createFeedback);
router.get("/getAllBlog/:blogId", getFeedbackByBlog);

export default router;
