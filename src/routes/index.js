import { Router } from "express";
import nowPlaying from "../controllers/now-playing";
import registerUser from "../controllers/register-user";
import trackHistory from "../controllers/trackHistory";
import videoHistory from "../controllers/videoHistory";
import localsearch from "../controllers/localsearch";

const router = Router();

router.get("/register-user", registerUser);
router.get("/now-playing/:id", nowPlaying);
router.get("/trackHistory/:id", trackHistory);
router.get("/trackHistoryWithVideo/:id", videoHistory);
router.get("/localSearch/:searchTerm", localsearch);

export default router;
