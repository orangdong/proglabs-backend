import db from "../../../../db/db.js";

const { main } = db;

const index = async (req, res, next) => {
  try {
    const { type, limit } = req.query;

    const prismaOptions = {};

    if (limit) {
      if (limit < 0) {
        return res.status(400).json({
          status: "error",
          message: "invalid limit",
        });
      }
      prismaOptions.take = parseInt(limit, 10);
    }

    if (type && (type === "premium" || type === "free")) {
      if (type === "premium") {
        prismaOptions.where = {
          isPremium: true,
        };
      } else {
        prismaOptions.where = {
          isPremium: false,
        };
      }
    }
    const courses = await main.course.findMany(prismaOptions);

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
