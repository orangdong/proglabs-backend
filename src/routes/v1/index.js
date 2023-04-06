import express from "express";
import course from "./handlers/course.js";
import checkKey from "./middlewares/checkKey.js";
import checkSignature from "./middlewares/checkSignature.js";
import checkToken from "./middlewares/checkToken.js";
import users from "./handlers/users.js";

const router = express.Router();

router.use(checkKey);
router.get("/courses/", course.index);
router.get("/courses/:id", course.getCourseById);

router.post("/users", users.createUser);
router.get("/users/:address", users.getUserByAddress);
router.put("/users/:address", users.updateUser);

router.post("/login", checkSignature, users.login);

export default router;
