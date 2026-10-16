const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { createUser, userLogin } = require("./controllers/users");

const app = express();

app.use(cors());

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.post("/signin", userLogin);
app.post("/signup", createUser);

app.use("/", mainRouter);
