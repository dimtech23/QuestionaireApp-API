import { CustomError } from "../middleware/error/index.js";
import User from "../models/User.js";


export const getUser = async (req, res, next) => {
  const { id } = req;
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      const notFoundError = new CustomError("User not found", 404);
      next(notFoundError);
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    const customError = new CustomError('Internal Server Error', 500);
    next(customError);
  }
};
