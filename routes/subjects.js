var express = require("express");
var router = express.Router();

const schema = require("../joi-schemas/subject");
const createResponse = require("./helpers/create-response");
const controller = require("../controllers/subjects");

router.get("/", async function (req, res, next) {
  try {
    res.json(
      createResponse({
        data: await controller.get(),
      })
    );
  } catch (error) {
    next(error);
  }
});

/* GET users listing. */
router.post("/", async function (req, res, next) {
  try {
    await schema.newSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(
      createResponse({
        error: error.message,
      })
    );
  }

  try {
    res.status(201).json(
      createResponse({
        data: await controller.add(req.body),
      })
    );
  } catch (error) {
    if (error.message === "Possible duplicate.") {
      return res.json(
        createResponse({
          error: "There is a subject existing with similar details.",
        })
      );
    }
    next(error);
  }
});

module.exports = router;
