"use strict";

const mongoose = require("mongoose");
const shorurlModel = require("../models/shorturlModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Test URL Shortener Microservice", () => {
  let server;

  beforeEach((done) => {
    server = require("../server");
    done();
  });
  afterEach((done) => server.close(() => done()));
  after(async () => {
    await shorurlModel.deleteMany();
    await mongoose.disconnect();
  });

  describe("POST /api/shorturl/new", () => {
    it("should return a JSON response with keys original_url, with value 'https://freecodecamp.org', and short_url, with value 1: { original_url : 'https://freecodecamp.org', short_url : 1}", (done) => {
      chai
        .request(server)
        .post("/api/shorturl/new")
        .send({ url_input: "https://www.freecodecamp.org/" })
        .end((err, res) => {
          // console.log(res.body);

          // Get results
          const actualOriginal_url = res.body.original_url;
          const actualShort_url = Number.parseInt(res.body.short_url);

          // Test results
          expect(actualOriginal_url).to.be.equal(
            "https://www.freecodecamp.org/"
          );
          expect(actualShort_url).to.be.equal(1);

          done();
        });
    });
  });

  describe("GET /api/shorturl/1", () => {
    it("should redirect to 'https://www.freecodecamp.org/'", (done) => {
      chai
        .request(server)
        .get("/api/shorturl/1")
        .end((err, res) => {
          // console.log(res.redirects[0]);
          // Get results
          const actualResult = res.redirects[0];
          const expectedResult = "https://www.freecodecamp.org/";

          // Test results
          expect(actualResult).to.be.equal(expectedResult);
          done();
        });
    });
  });
});
