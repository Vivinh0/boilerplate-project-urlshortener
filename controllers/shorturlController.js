"use strict";

const shorturlModel = require("../models/shorturlModel");
const dns = require("dns");

module.exports = {
  validateUrl: (req, res, next) => {
    const url_input = req.body.url;
    const invalidUrlRes = () => res.json({ error: "Invalid URL" });

    const validURL = RegExp(
      "^(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
    ).test(url_input);

    if (validURL) {
      // Check if hostname exists
      const url = new URL(url_input);
      dns.lookup(url.hostname, (err, address, family) => {
        if (err) {
          return invalidUrlRes();
        } else {
          next();
        }
      });
    } else {
      console.error("invalid URL");
      return invalidUrlRes();
    }
  },
  newShorturl: async (req, res, next) => {
    try {
      // Set autoincrement int as short url
      const counter = (await shorturlModel.countDocuments()) + 1;

      // Instantiate model to create
      const shorturlToCreate = new shorturlModel({
        original_url: req.body.url,
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
  redirect: async (req, res, next) => {
    try {
      const shorturlToFind = req.params.shorturl;
      const filter = { short_url: shorturlToFind };
      const foundShorturl = await shorturlModel.findOne(filter);
      if (foundShorturl) {
        // console.log(foundShorturl.original_url);
        res.redirect(foundShorturl.original_url);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
