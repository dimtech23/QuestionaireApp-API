import jwt from "jsonwebtoken";
import { CustomError } from "./error/index.js";


const userAuth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const authError = new CustomError("You need to log in to access this resource!!!", 401);
    return next(authError);
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    const tokenError = new CustomError("Invalid token format", 401);
    return next(tokenError);
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decodedData?.id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const expiredTokenError = new CustomError('Token has expired', 401);
      return next(expiredTokenError);
    } else if (error.name === 'JsonWebTokenError') {
      const invalidTokenError = new CustomError('Invalid token', 401);
      return next(invalidTokenError);
    } else {
      const internalServerError = new CustomError('Something went wrong', 500);
      return next(internalServerError);
    }
  }
};

export default userAuth;
