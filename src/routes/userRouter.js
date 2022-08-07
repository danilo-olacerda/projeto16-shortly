import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { getUserInfo } from "../controllers/userController.js";

const router = Router();

router.get("/users/me", validateToken, getUserInfo);

export default router;