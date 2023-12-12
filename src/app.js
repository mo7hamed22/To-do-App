// src/app.js

const express = require("express");
const app = express();
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const router = express.Router();
const port = process.env._PORT || 5555;

bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
mongoose
  .connect(
    process.env.MONGO_URI 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connecting to database successful"))
  .catch((err) => console.error("could not connect to mongo DB", err));

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/", (req, res) => {
  res.status(404).send("Not Found Page");
});
app.listen(port, () => {
  console.log(`Server Is Running On ${port}`);
});
module.exports = router;
