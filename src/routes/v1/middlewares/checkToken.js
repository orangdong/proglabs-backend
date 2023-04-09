import jwt from "jsonwebtoken";
import config from "../../../../config/config.js";

export default (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized, No token provided",
    });
  }

  const validate = jwt.verify(token, config.jwtSecret);

  if (!validate) {
    return res.status(401).json({
      status: "error",
      message: "invalid token",
    });
  }

  req.user = validate;

  next();
};
