const express = require("express");
const db = require("./config/db"); // Make sure this path is correct based on where your db.js file is
const cors = require("cors");
const authRoutes = require("./routes/auth")
const resumeRoutes = require('./routes/resumeRoutes');
const questionRoutes = require('./routes/questionRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5174", // 👈 your frontend URL
  credentials: true,              // 👈 allow cookies/session headers
}));
app.use(express.json());

// Connect to Database
db();

// Sample Route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Routes
// Routes

app.use('/api/resume', resumeRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/evaluate', evaluationRoutes);
app.use("/api/auth", authRoutes);
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
