import express from "express";

import { loginUser, registerUser } from "../controllers/users";
import { refreshToken } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refreshToken)

export default router;