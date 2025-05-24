const express = require("express");
const db = require("./config/db"); // Make sure this path is correct based on where your db.js file is
const cors = require("cors");
const authRoutes = require("./routes/auth")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
db();

// Sample Route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Routes
// Routes
app.use("/api/auth", authRoutes);
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
