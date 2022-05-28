import express from "express";
var router = express.Router();

import { createPod, getAllPods, getPodById } from "../controllers/podcast";

router.post("/create", createPod);
router.get("/getAll", getAllPods);
router.get("/getOne/:podId", getPodById);

export default router;
