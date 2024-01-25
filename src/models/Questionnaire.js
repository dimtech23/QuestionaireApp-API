import mongoose from "mongoose";

const QuestionnaireSchema = new mongoose.Schema({
  insuranceData: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Insurance data is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Questionnaire", QuestionnaireSchema);
