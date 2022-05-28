import express from "express";

const router = express.Router();

import { accessChat, addToGroup, createGroupChat, fetchChats } from "../controllers/chatController";
import { isLoggedIn } from "../middlewares/authWrapper";

router.route("/").post(isLoggedIn, accessChat);
router.route("/").get(isLoggedIn, fetchChats);
router.route("/group").post(isLoggedIn, createGroupChat);
router.route("/groupadd").put(isLoggedIn, addToGroup);

export default router;
