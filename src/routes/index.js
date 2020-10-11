import { Router } from "express";
import ConnectSpotify from "../controllers/connect-spotify";
import BasePage from "../controllers/base";

const router = Router();

router.get("/", (req, res) => {
  res.send({ response: "working" }).status(200);
});

router.get("/base", BasePage);

router.get("/connect-spotify", ConnectSpotify);

// router.use("/img", ImgRouter);

export default router;
