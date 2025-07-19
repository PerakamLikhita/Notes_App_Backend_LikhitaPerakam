const express = require("express");
require("dotenv").config(); 
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

app.use("/", userRoutes);
app.use("/", noteRoutes);

module.exports = app;
