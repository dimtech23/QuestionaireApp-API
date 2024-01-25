import mongoose from "mongoose";

const Questionnaire = new mongoose.Schema({
  insuranceData: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
   
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }

});

export default mongoose.model("Questionnaire", Questionnaire);