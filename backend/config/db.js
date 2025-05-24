const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb+srv://gprasath103:URJpMCJ1ivxaohz5@cluster0.e5o0stk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));
};

module.exports = db;
