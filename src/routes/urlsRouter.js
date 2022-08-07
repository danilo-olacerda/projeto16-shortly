import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import { newShortUrl, urlsById, openUrl } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validateToken, newShortUrl);
router.get("/urls/:id", urlsById);
router.get("/urls/open/:shortUrl", openUrl);

//res.redirect(301, 'http://example.com')

export default router;