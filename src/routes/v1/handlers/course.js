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
      message: "Course fetched successfully",
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

const getMyCourseDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const includeLessons = req.query.includeLessons === "true";

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
            courseLessons: true,
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

    if (includeLessons) {
      const finishedLesson = await main.finishedLesson.findMany({
        where: {
          userId: user.id,
          lessonId: {
            in: [].concat(
              ...course.courseModules.map((cm) =>
                cm.courseLessons.map((cl) => cl.id)
              )
            ),
          },
        },
      });

      course.courseModules.forEach((cm) => {
        cm.courseLessons.forEach((cl) => {
          cl.isFinished = false;
          if (finishedLesson.find((fl) => fl.lessonId === cl.id)) {
            cl.isFinished = true;
          }
        });
      });
    }

    return res.json({
      status: "success",
      message: "course fetched",
      data: course,
    });
  } catch (e) {
    next(e);
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const { isCourseFinished, lessonId } = req.body;
    const user = req.user;

    const finishedLesson = await main.finishedLesson.create({
      data: {
        lessonId,
        userId: user.id,
      },
    });

    if (isCourseFinished?.isComplete) {
      const userCourse = await main.userCourse.findFirst({
        where: {
          courseId: isCourseFinished.id,
          userId: user.id,
        },
      });

      if (!userCourse) {
        return res.status(400).json({
          status: "error",
          message: "user & course not registered",
        });
      }

      await main.userCourse.update({
        where: {
          id: userCourse.id,
        },
        data: {
          completedAt: isCourseFinished.date,
          isComplete: isCourseFinished.isComplete,
        },
      });
    }

    return res.json({
      status: "success",
      message: "lesson finished",
      data: finishedLesson,
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
  getMyCourseDetail,
  updateLesson,
};
