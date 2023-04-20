import db from "../../../../db/db.js";
import jwt from "jsonwebtoken";
import config from "../../../../config/config.js";

const { main } = db;

const createUser = async (req, res, next) => {
  try {
    const { address, name } = req.body;

    const checkUser = await main.user.findFirst({
      where: {
        walletAddress: address,
      },
    });

    if (checkUser) {
      return res.status(400).json({
        status: "error",
        message: "wallet already exists",
      });
    }

    const userName = name || address;

    const user = await main.user.create({
      data: {
        walletAddress: address,
        name: userName,
        avatar: `https://ui-avatars.com/api/?name=${userName}&color=656F78&background=F6F6F6`,
      },
    });

    return res.json({
      status: "success",
      message: "User created",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

const getUserByAddress = async (req, res, next) => {
  try {
    const { address } = req.params;
    const user = await main.user.findFirst({
      where: {
        walletAddress: address,
      },
    });

    return res.json({
      status: "success",
      message: "User fetched",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { address } = req.params;
    const { name } = req.body;

    const user = await main.user.update({
      where: {
        walletAddress: address,
      },
      data: {
        name,
      },
    });

    return res.json({
      status: "success",
      message: "User updated",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

const updateCurrentUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = req.user;

    const update = await main.user.update({
      where: {
        id: parseInt(user.id, 10),
      },
      data: {
        name,
        email,
      },
    });

    return res.json({
      status: "success",
      message: "User updated",
      data: update,
    });
  } catch (e) {
    next(e);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;

    const currUser = await main.user.findUnique({
      where: {
        id: parseInt(user.id, 10),
      },
    });

    if (!currUser) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    return res.json({
      status: "success",
      message: "User fetched",
      data: currUser,
    });
  } catch (e) {
    next(e);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const user = req.user;

    const courses = await main.userCourse.findMany({
      where: {
        userId: parseInt(user.id, 10),
      },
      include: {
        course: true,
      },
    });

    return res.json({
      status: "success",
      message: "User courses fetched",
      data: courses,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { publicKey } = req.body;

    const user = await main.user.findFirst({
      where: {
        walletAddress: publicKey,
      },
    });

    const data = {
      id: user.id,
      name: user.name,
      publicKey,
      email: user.email,
      avatar: user.avatar,
    };

    // hours * minutes
    const expiry = 3 * 60;
    const currTime = new Date().getTime();
    const accTokenExp = new Date(currTime + expiry * 60 * 1000);
    const token = jwt.sign(data, config.jwtSecret, { expiresIn: `${expiry}m` });

    return res.json({
      status: "success",
      message: "login success",
      data: {
        accessToken: token,
        accessTokenExpiry: accTokenExp,
        user: data,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createUser,
  getUserByAddress,
  updateUser,
  login,
  updateCurrentUser,
  getCurrentUser,
  getCourses,
};
