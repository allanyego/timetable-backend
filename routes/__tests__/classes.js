const supertest = require("supertest");

const app = require("../../app");

const request = supertest(app);

const BASE_URL = "/api/v1";

describe("/classes", function () {
  const url = `${BASE_URL}/classes`;

  describe("GET /", function () {
    it("should return list of classes", async (done) => {
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
