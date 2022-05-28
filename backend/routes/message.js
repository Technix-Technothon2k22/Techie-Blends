import express from "express";

const router = express.Router();

import { allMessages, sendMessage } from "../controllers/messageController";
import { isLoggedIn } from "../middlewares/authWrapper";

router.route("/:chatId").get(isLoggedIn, allMessages);
router.route("/").post(isLoggedIn, sendMessage);

export default router;
