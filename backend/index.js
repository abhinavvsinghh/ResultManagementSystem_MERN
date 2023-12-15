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
app.use(
  cors({
    origin: "https://result-management-system-mern.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware to set headers
app.use((req, res, next) => {
  // Set custom headers as needed
  res.header("X-Custom-Header", "Custom Value");

  // Set CORS headers
  res.header("Access-Control-Allow-Origin", "https://result-management-system-mern.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // Continue to the next middleware/route handler
  next();
});

// Connection
connectMongoDB(DB_CONNECTION)
  .then(() => console.log("Connected with DB"))
  .catch((error) => console.log("Mongo Error", error));

// Routes
app.get('/',(req,res)=>{
  res.json('Hello');
})
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});
