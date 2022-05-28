const express = require("express");
const { allUsers } = require("../controllers/userControllers");
import { isLoggedIn } from "../middlewares/authWrapper";

const router = express.Router();

router.route("/").get(isLoggedIn, allUsers);

export default router;
