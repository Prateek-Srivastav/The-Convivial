require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const winston = require("winston");
require("express-async-errors");
const error = require("./middleware/error");

if (!process.env.DB) {
  console.error("!!FATAL ERROR!! Database not connected.");
  process.exit(1);
}

const articleRouter = require("./routes/articles");

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/articles", articleRouter);

app.use(error);

winston.configure({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.level}: ${info.message}`)
      ),
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});

mongoose
  .connect(process.env.DB)
  .then(() => winston.info("mongo connected.."))
  .catch((err) => console.error(err.message, err));

const port = process.env.PORT || 8000;
app.listen(port, () => winston.info(`server started on port ${port}`));
