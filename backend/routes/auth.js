//auth
import express from "express";

const router = express.Router();
import {
  Signup,
  VerifyUser,
  Login,
  Logout,
  addDetails,
  approveAdvisor,
  isAdvisorVerified,
  getAdvisorFormById,
} from "../controllers/auth";
import { isLoggedIn, customRole } from "../middlewares/index";
router.get("/", (req, res) => {
  res.send("hello");
});
router.param("advisorId", getAdvisorFormById);
router.post("/signup", Signup);
router.post("/verify", VerifyUser);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/addDetails", isLoggedIn, addDetails);
router.post("/editadvisorstatus/:advisorId", approveAdvisor);

router.get("/verified", isLoggedIn, isAdvisorVerified);

export default router;
