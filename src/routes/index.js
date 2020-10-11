import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send({ response: "working" }).status(200);
});

// router.use("/img", ImgRouter);

export default router;