import express from "express";
import * as AuthController from "../controllers/authController";
import { RequestHandler } from "express";

const router = express.Router();

router.post("/login", AuthController.login as RequestHandler);
router.post("/logout", AuthController.logout as RequestHandler);

export default router;
