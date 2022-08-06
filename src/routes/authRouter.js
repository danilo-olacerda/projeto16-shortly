import { Router } from "express";
import validateSignup from "../middlewares/validateSignup.js";
import validateSignin from "../middlewares/validateSignin.js";
import { register, login } from "../controllers/authController.js";

const router = Router();

router.post("/signup", validateSignup, register);
router.post("/signin", validateSignin, login);

export default router;