const mongoose = require("mongoose");

// Student Schema
const studentSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

// Creating a 'Student' model based on the defined schema
const Student = mongoose.model("student", studentSchema);

module.exports = Student;
