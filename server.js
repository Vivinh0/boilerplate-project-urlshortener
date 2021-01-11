require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Init DB connection
require("./config/db");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
// Setup body parsers (query - body)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
// /api/shorturl endpoint
app.use("/api/shorturl", require("./routers/shorturlRouter"));

module.exports = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
