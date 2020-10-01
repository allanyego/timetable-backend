const supertest = require("supertest");

const app = require("../../app");
const Stream = require("../../models/stream");
const Class = require("../../models/class");

const request = supertest(app);

const BASE_URL = "/api/v1";

let testStream;

beforeAll(async function () {
  testStream = await Stream.create({
    name: "yellow",
  });
});

afterAll(async function () {
  await Class.deleteMany({});
  await Stream.deleteMany({});
});

describe("/classes", function () {
  const url = `${BASE_URL}/classes`;

  describe.skip("GET /", function () {
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

  describe("POST /", function () {
    it("should return newly created class", async (done) => {
      try {
        let resp = await request.post(`${BASE_URL}/teachers/signin`).send({
          username: "devyego@gmail.com",
          password: process.env.TEST_USER_PASSWORD,
        });

        if (!resp.body?.data?.token) {
          throw new Error("Authentication failed.");
        }

        resp = await request
          .post(url)
          .send({
            level: "2",
            stream: testStream._id,
            classTeacher: resp.body.data._id,
          })
          .set({
            Authorization: `Bearer ${resp.body.data.token}`,
          });

        expect(resp.status).toBe(201);
        expect(resp.body.data.level).toBeDefined();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
