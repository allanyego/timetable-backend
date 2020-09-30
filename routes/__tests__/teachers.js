const supertest = require("supertest");

const app = require("../../app");

const request = supertest(app);

const BASE_URL = "/api/v1";

describe("/teachers", function () {
  describe("POST /", function () {
    it("should return authenticated user", async (done) => {
      try {
        const resp = await request.post(`${BASE_URL}/teachers/signin`).send({
          username: "devyego@gmail.com",
          password: "dot1love",
        });

        expect(resp.status).toBe(200);
        expect(resp.body.data.token).toBeDefined();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
