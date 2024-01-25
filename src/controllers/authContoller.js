import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { CustomError, notFoundHandler } from "../middleware/error/index.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const passwordValid = await argon2.verify(user.password, password);

      if (passwordValid) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      } else {
        const error = new CustomError("Invalid credentials....", 400);
        next(error);
      }
    } else {
      notFoundHandler(req, res, next);
    }
  } catch (error) {
    console.error('Error during login:', error);
    const customError = new CustomError("Something went wrong!!!", 500);
    next(customError);
  }
};

export const logout = async (req, res,) => {
  try {
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error('Error during logout:', error);
    const customError = new CustomError("Logout failed", 500);
    errorHandler(customError, req, res, null);
  }
};


export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if(user){
      const validationError = new CustomError('This email might exist please try and login instead', 400);
      return next(validationError);
    }
    const hashPassword = await argon2.hash(password)
    const newUser = new User({ name, email, password:hashPassword });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationError = new CustomError(error.message, 400, error.errors);
      return next(validationError);
    }

    console.error('Error during registration:', error);
    const customError = new CustomError("Internal Server Error", 500);
    next(customError);
  }
};
