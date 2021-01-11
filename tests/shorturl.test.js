"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

function objToString(object) {
  return JSON.stringify(object, null, 2);
}

describe("Test URL Shortener Microservice", () => {
  let server;

  beforeEach((done) => {
    server = require("../server");
    done();
  });
  afterEach((done) => server.close(() => done()));

  describe("POST /api/shorturl/new", () => {
    it("should return a JSON response with keys original_url, with value 'https://freecodecamp.org', and short_url, with value 1: { original_url : 'https://freecodecamp.org', short_url : 1}", (done) => {
      chai
        .request(server)
        .post("/api/shorturl/new")
        .send({ url_input: "https://www.freecodecamp.org/" })
        .end((err, res) => {
          // Get results
          const actualResult = res.body;
          const expectedResult = {
            original_url: "https://freecodecamp.org",
            short_url: 1,
          };

          // Results to Strings
          const actualResultToString = objToString(actualResult);
          const expectedResultToString = objToString(expectedResult);

          // Test results
          expect(actualResultToString).to.be.equal(expectedResultToString);

          done();
        });
    });
  });
});
