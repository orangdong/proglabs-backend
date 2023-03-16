import db from "../../../../db/db.js";

const { main } = db;

const index = async (req, res, next) => {
  try {
    const courses = await main.course.findMany();

    return res.json({
      status: "success",
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (e) {
    next(e);
  }
};
export default {
  index,
};
