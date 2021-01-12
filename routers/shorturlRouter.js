"use strict";

const express = require("express");
const router = express.Router();
const shorturlController = require("../controllers/shorturlController");

// module.exports = router.post("/new", (req, res, next) => {
//   res.json({ msg: "Ok" });
// });

module.exports = router
  .post("/new", shorturlController.newShorturl)
  .get("/:shorturl", shorturlController.redirect);
