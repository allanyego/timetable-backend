const supertest = require("supertest");

const app = require("../../app");

const request = supertest(app);

const BASE_URL = "/api/v1";

describe("/streams", function () {
  describe("GET /", function () {
    const url = `${BASE_URL}/streams`;
    it("should return a list of streams", async (done) => {
      try {
        const resp = await request.get(url);

        expect(resp.status).toBe(200);
        expect(resp.body.data.length).toBeDefined();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
