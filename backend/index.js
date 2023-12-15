const express = require("express");
const cors = require("cors");
require("dotenv/config");

const { connectMongoDB } = require("./connection");
const studentRouter = require("./routes/studentRoute");
const teacherRouter = require("./routes/teacherRoute");

// Initialize express app
const app = express();

// Constants
const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.DB_CONNECTION;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection
connectMongoDB(DB_CONNECTION)
  .then(() => console.log("Connected with DB"))
  .catch((error) => console.log("Mongo Error", error));

// Routes
app.get("/", (req, res) => {
  res.json("Hello");
});
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});
