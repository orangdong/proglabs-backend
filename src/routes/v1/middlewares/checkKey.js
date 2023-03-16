import config from "../../../../config/config.js";

export default (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized, No key provided",
    });
  }

  if (key !== config.appKey) {
    return res.status(401).json({
      status: "error",
      message: "invalid key",
    });
  }

  next();
};
