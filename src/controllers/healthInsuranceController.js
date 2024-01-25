import { CustomError } from "../middleware/error/index.js";
import Questionnaire from "../models/Questionnaire.js";


export const createHealthInsurance = async (req, res, next) => {
  try {
    const { id } = req;
    const data = req.body;
    const savedData = await Questionnaire.create({
      user: id,
      insuranceData: data,
    });

    res.status(200).json({ success: true, data: savedData });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationError = new CustomError(error.message, 400, error.errors);
      return next(validationError);
    }

    console.error('Error creating health insurance data:', error);
    const customError = new CustomError('Something went wrong!!!', 500);
    next(customError);
  }
};

export const getHealthInsurance = async (req, res, next) => {
  try {
    const userId = req.id;
    const userHealthInsurance = await Questionnaire.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json({ success: true, data: userHealthInsurance });
  } catch (error) {
    console.error('Error retrieving health insurance data:', error);
    const customError = new CustomError('Internal Server Error', 500);
    next(customError);
  }
};
