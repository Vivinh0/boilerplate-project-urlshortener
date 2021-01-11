"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema must follow documents
const shorturlSchema = new Schema({
  original_url: { type: String, unique: true, require: true },
  short_url: { type: String, unique: true, require: true },
});
// Create collection shorturl with schema shorturlSchema in MongoDB
const shorturlModel = mongoose.model("shorturl", shorturlSchema);

module.exports = shorturlModel;
