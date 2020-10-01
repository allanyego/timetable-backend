const supertest = require("supertest");

const app = require("../../app");
const Teacher = require("../../models/teacher");

const request = supertest(app);

const BASE_URL = "/api/v1";

afterAll(async function () {
  await Teacher.deleteMany({ username: { $ne: "yego" } });
});

describe("/teachers", function () {
  let mainTeacher;

  describe("POST /signin", function () {
    it("should return authenticated user", async (done) => {
      try {
        const resp = await request.post(`${BASE_URL}/teachers/signin`).send({
          username: "devyego@gmail.com",
          password: "dot1love",
        });

        expect(resp.status).toBe(200);
        expect(resp.body.data.token).toBeDefined();
        mainTeacher = resp.body.data;
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe("POST /", function () {
    it("should return newly created teacher", async (done) => {
      try {
        const resp = await request
          .post(`${BASE_URL}/teachers`)
          .send({
            firstName: "john",
            lastName: "lu",
            username: "johnlu",
            email: "johnlu@mail.com",
            title: "prof",
          })
          .set({
            Authorization: `Bearer ${mainTeacher.token}`,
          });

        expect(resp.status).toBe(201);
        expect(resp.body.data.password).toBeDefined();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
