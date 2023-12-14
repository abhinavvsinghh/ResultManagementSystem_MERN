const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Teacher = require("../models/teacherModel");

// Secret key for JWT 
const jwtSecretKey = process.env.jwtSecretKey;

// Function to handle teacher signup
async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(409).json({
        status: false,
        message: "Email is already registered",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new teacher document
    const newTeacher = new Teacher({ name, email, password: hashedPassword });
    // Save the new teacher to the database
    const savedTeacher = await newTeacher.save();

    return res.status(201).json({
      status: true,
      data: savedTeacher,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

// Function to handle teacher login
async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if a teacher with the provided email exists
    const existingTeacher = await Teacher.findOne({ email });
    if (!existingTeacher) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      password,
      existingTeacher.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ id: existingTeacher._id }, jwtSecretKey, {
      expiresIn: "1h",
    });

    return res.json({
      status: true,
      data: {
        token,
        teacher: {
          id: existingTeacher._id,
          name: existingTeacher.name,
          email: existingTeacher.email,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

// Function to handle teacher logout
async function handleLogout(req, res) {
  try {
    // Assuming you are sending the token in the request header
    const token = req.headers.authorization;

    // Check if the token is provided
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token provided",
      });
    }

    // Verify the token and invalidate it (optional)
    const verifyAsync = promisify(jwt.verify);
    await verifyAsync(token, jwtSecretKey);

    return res.json({
      status: true,
      message: "Logout successful",
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
  handleSignup,
  handleLogin,
  handleLogout,
};
