"use strict";

const shorturlModel = require("../models/shorturlModel");

module.exports = {
  newShorturl: async (req, res, next) => {
    try {
      // Set autoincrement int as short url
      const counter = (await shorturlModel.count()) + 1;

      // Instantiate model to create
      const shorturlToCreate = new shorturlModel({
        original_url: req.body.url_input,
        short_url: counter,
      });

      // Create model in MongoDB
      const createdShorturl = await shorturlModel.create(shorturlToCreate);

      // Return created document
      res.json(createdShorturl);
    } catch (error) {
      console.error(error);
      // If error return 500 Internal Server Error
      res.sendStatus(500);
    }
  },
};
