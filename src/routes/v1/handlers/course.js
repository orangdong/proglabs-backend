import db from "../../../../db/db.js";

const { main } = db;

const index = async (req, res, next) => {
  try {
    const { type, limit } = req.query;

    const prismaOptions = {
      include: {
        courseTechnologies: true,
        _count: {
          select: {
            courseModules: true,
          },
        },
      },
    };

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

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await main.course.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        courseModules: {
          select: {
            id: true,
            title: true,
            _count: {
              select: {
                courseLessons: true,
              },
            },
          },
        },
        courseTechnologies: true,
        _count: {
          select: {
            userCourses: true,
          },
        },
      },
    });

    return res.json({
      status: "success",
      message: "Courses fetched successfully",
      data: course,
    });
  } catch (e) {
    next(e);
  }
};

const enrollCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const findUserCourse = await main.userCourse.findFirst({
      where: {
        courseId: parseInt(id),
        userId: user.id,
      },
    });

    if (findUserCourse) {
      return res.status(400).json({
        status: "error",
        message: "course already enrolled",
      });
    }

    const enroll = await main.userCourse.create({
      data: {
        courseId: parseInt(id),
        userId: user.id,
      },
    });

    return res.json({
      status: "success",
      message: "Course enrolled",
      data: enroll,
    });
  } catch (e) {
    next(e);
  }
};

const checkEnroll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const findUserCourse = await main.userCourse.findFirst({
      where: {
        courseId: parseInt(id),
        userId: user.id,
      },
    });

    return res.json({
      status: "success",
      message: "User checked",
      data: findUserCourse,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  index,
  getCourseById,
  enrollCourse,
  checkEnroll,
};
