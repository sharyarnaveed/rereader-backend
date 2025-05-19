const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet= require("helmet")

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ limit: "100kb", extended: true }));
app.use(cookieParser());

const userroutes = require("./routes/user.routes.js");
app.use("/api/user", userroutes);

module.exports = { app };
