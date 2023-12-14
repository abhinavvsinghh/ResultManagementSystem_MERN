const Student = require("../models/studentModel");

// Handler to get all student results
async function handleGetAllStudentResult(req, res) {
  try {
    const results = await Student.find({}).sort({ rollNo: 1 }).lean();

    // Check if results array is empty
    if (results.length === 0) {
      return res.json({
        status: false,
        message: "No student results found",
        data: [],
      });
    }

    return res.json({
      status: true,
      data: results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

// Handler to get a specific student result by rollNo and dob
async function handleGetStudentResultByRollandDob(req, res) {
  try {
    const rollNo = req.params.rollNo;
    const dob = req.params.dob;
    const result = await Student.findOne({ rollNo, dob });

    if (result) {
      // If a result is found, send it in the response
      return res.json({
        status: true,
        data: result,
      });
    } else {
      // If no result is found, send a 404 Not Found response
      return res.status(404).json({
        status: false,
        message: "Student result not found!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error!",
    });
  }
}

// Handler to add a new student result
async function handleAddStudentResult(req, res) {
  try {
    const { rollNo, name, dob, score } = req.body;

    // Check if rollNo already exists
    const existingStudentResult = await Student.findOne({ rollNo });
    if (existingStudentResult) {
      return res.status(409).json({
        status: false,
        message: "Roll number already exists",
      });
    }

    // Create a new student document
    const newStudentResult = new Student({
      rollNo,
      name,
      dob,
      score,
    });
    // Save the new student to the database
    const savedStudentResult = await newStudentResult.save();

    return res.status(201).json({
      status: true,
      data: savedStudentResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

// Handler to update an existing student result
async function handleUpdateStudentResult(req, res) {
  try {
    const rollToUpdate = req.params.rollNo;
    const { name, dob, score } = req.body;
    const updatedResult = await Student.findOneAndUpdate(
      { rollNo: rollToUpdate },
      { $set: { name, dob, score } },
      { new: true }
    );

    // Check if the student with the given roll exists
    if (!updatedResult) {
      return res.status(404).json({
        status: false,
        message: "Student result not found",
      });
    }

    return res.json({
      status: true,
      data: updatedResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

// Handler to delete an existing student result by rollNo
async function handleDeleteStudentResult(req, res) {
  try {
    const rollToDelete = req.params.rollNo;
    const deletedResult = await Student.findOneAndDelete({
      rollNo: rollToDelete,
    });

    // Check if no result was found for the given rollNo
    if (!deletedResult) {
      return res.status(404).json({
        status: false,
        message: "Student result not found",
      });
    }

    return res.json({
      status: true,
      data: deletedResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  handleGetAllStudentResult,
  handleGetStudentResultByRollandDob,
  handleAddStudentResult,
  handleUpdateStudentResult,
  handleDeleteStudentResult,
};
