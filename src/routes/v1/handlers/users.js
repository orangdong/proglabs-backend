import db from "../../../../db/db.js";

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

export default {
  createUser,
  getUserByAddress,
  updateUser,
};
