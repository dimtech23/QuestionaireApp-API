import { CustomError, errorHandler } from "./index.js";

 export const mainError = (err, req, res, next) => {
  if (err instanceof CustomError) {
    errorHandler(err, req, res, next);
  } else {
    res.status(500).json({ error: 'Something went wrong!!!' });
  }
 }
