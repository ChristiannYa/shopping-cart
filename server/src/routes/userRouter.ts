import express from "express";
import { getCurrentUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/auth";
import { RequestHandler } from "express";

const router = express.Router();

router.get("/current", authenticateToken, getCurrentUser as RequestHandler);

export default router;
