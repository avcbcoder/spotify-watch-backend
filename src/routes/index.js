import { Router } from "express";
import nowPlaying from "../controllers/now-playing";
import registerUser from "../controllers/register-user";
import momo from "../controllers/momo";

const router = Router();

router.get("/register-user", registerUser);
router.get("/now-playing/:id", nowPlaying);
router.get("/momo/:id", momo);

export default router;
