const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet= require("helmet")
const passport=require("passport")
const compression = require("compression");
const path = require('path');

dotenv.config({
  path: "./.env",
});
const app = express();

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, '../public')));
// Alternative: serve images directly
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(compression());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(passport.initialize())

const userroutes = require("./routes/user.routes.js");
app.use("/api/user", userroutes);

module.exports = { app };
