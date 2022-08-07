import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { newShortUrl, urlsById, openUrl, deleteById } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validateToken, newShortUrl);
router.get("/urls/:id", urlsById);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", validateToken, deleteById);

export default router;