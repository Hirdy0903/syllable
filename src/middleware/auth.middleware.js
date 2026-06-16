import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      new ApiError(401, "Authentication required")
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      new ApiError(401, "Authentication required")
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch {
    next(new ApiError(401, "Invalid token"));
  }
};