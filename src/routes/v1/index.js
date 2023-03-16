import express from "express";
import course from "./handlers/course.js";
import checkKey from "./middlewares/checkKey.js";

const router = express.Router();

router.use(checkKey);
router.get("/courses/", course.index);

export default router;
