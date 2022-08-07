import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { getUserInfo, getUsersRank } from "../controllers/userController.js";

const router = Router();

router.get("/users/me", validateToken, getUserInfo);
router.get("/ranking", getUsersRank);

export default router;