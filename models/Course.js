const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione um título"],
  },
  description: {
    type: String,
    required: [true, "Por favor, adicione uma descrição"],
  },
  weeks: {
    type: String,
    required: [true, "Por favor, adicione o número de semanas"],
  },
  tuition: {
    type: Number,
    required: [true, "Por favor, adicione o custo do curso"],
  },
  minSkill: {
    type: String,
    required: [true, "Por favor, adicione um nível de experiência mínimo"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scolarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
