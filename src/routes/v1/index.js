import express from "express";
import course from "./handlers/course.js";
import checkKey from "./middlewares/checkKey.js";
import checkSignature from "./middlewares/checkSignature.js";
import checkToken from "./middlewares/checkToken.js";
import users from "./handlers/users.js";
import membership from "./handlers/membership.js";
import filterFile from "./middlewares/filterFile.js";

const router = express.Router();

router.use(checkKey);
router.get("/courses/", course.index);
router.get("/courses/:id", course.getCourseById);
router.put("/courses/:id/enroll", checkToken, course.enrollCourse);
router.get("/courses/:id/enroll", checkToken, course.checkEnroll);
router.put("/courses/lesson", checkToken, course.updateLesson);

router.post("/users", users.createUser);
router.get("/users/:address", users.getUserByAddress);
router.put("/users/:address", users.updateUser);
router.put(
  "/me",
  checkToken,
  filterFile.single("avatar"),
  users.updateCurrentUser
);
router.get("/me", checkToken, users.getCurrentUser);
router.get("/me/courses", checkToken, users.getCourses);
router.get("/me/my-course/:id", checkToken, course.getMyCourseDetail);

router.get("/membership", checkToken, membership.index);
router.post("/membership", checkToken, membership.createNewNft);
router.get("/membership/mint-data", membership.mintData);

router.post("/login", checkSignature, users.login);

export default router;
