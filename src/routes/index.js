import { Router } from "express";
import nowPlaying from "../controllers/spotify/now-playing";
import registerUser from "../controllers/spotify/register-user";

const router = Router();

router.get("/register-user", registerUser);
router.get("now-playing/:id", nowPlaying);

export default router;
