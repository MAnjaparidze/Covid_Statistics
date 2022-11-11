import express from "express";
import { verify } from "../middleware/auth";
import { getStatistics } from "../controllers/statistics/index";

const router = express.Router();

router.get("/", verify, getStatistics);

export default router;