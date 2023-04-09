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

    const user = await main.user.create({
      data: {
        walletAddress: address,
        name: name || address,
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
};
