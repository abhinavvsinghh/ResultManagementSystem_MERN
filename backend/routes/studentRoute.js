const express = require("express");

const {
  handleGetAllStudentResult,
  handleGetStudentResultByRollandDob,
  handleAddStudentResult,
  handleUpdateStudentResult,
  handleDeleteStudentResult,
} = require("../controllers/studentController");

const router = express.Router();

// Get all students results
router.get("/", handleGetAllStudentResult);

// Get single student result based on rollNum and DOB
router.get("/:rollNo/:dob", handleGetStudentResultByRollandDob);

// Add student result
router.post("/", handleAddStudentResult);

// Update student result
router.patch("/:rollNo", handleUpdateStudentResult);

// Delete student result
router.delete("/:rollNo", handleDeleteStudentResult);

module.exports = router;
