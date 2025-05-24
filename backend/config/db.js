const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
const db = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));
};

module.exports = db;
