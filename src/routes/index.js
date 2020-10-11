import { Router } from "express";
import nowPlaying from "../controllers/now-playing";
import registerUser from "../controllers/register-user";

const router = Router();

router.get("/register-user", registerUser);
router.get("/now-playing/:id", nowPlaying);

export default router;
