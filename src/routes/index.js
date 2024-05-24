import { Router } from "express";
import nowPlaying from "../controllers/now-playing";
import registerUser from "../controllers/register-user";
import trackHistory from "../controllers/trackHistory";

const router = Router();

router.get("/register-user", registerUser);
router.get("/now-playing/:id", nowPlaying);
router.get("/trackHistory/:id", trackHistory);

export default router;
