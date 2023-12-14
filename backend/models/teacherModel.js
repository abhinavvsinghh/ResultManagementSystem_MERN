const mongoose = require("mongoose");

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password should contain atleast 8 characters!"],
  },
});

// Creating a 'Teacher' model based on the defined schema
const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;
