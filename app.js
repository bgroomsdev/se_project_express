require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const { createUser, userLogin } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { validateUser, validateUserLogin } = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

app.use(cors());

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", validateUserLogin, userLogin);
app.post("/signup", validateUser, createUser);

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
