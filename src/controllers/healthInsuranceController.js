import Questionnaire from "../models/Questionnaire.js";


export const createHealthInsurance = async (req, res) => {

  try {
   const  {id } = req;
  const data =    req.body;
    // Save data to MongoDB
    const savedData = await Questionnaire.create({
      user:id,
      insuranceData: data,
   
    });
    res.status(200).json({ success: true, data: savedData });
  } catch (error) {
    console.error('Error creating health insurance data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const getHealthInsurance = async (req, res) => {
  try {
    const userId = req.id;
    const userHealthInsurance = await Questionnaire.findOne({ user: userId });

    res.status(200).json({ success: true, data: userHealthInsurance });
  } catch (error) {
    console.error('Error retrieving health insurance data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




