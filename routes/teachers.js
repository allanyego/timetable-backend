var express = require("express");
const bcrypt = require("bcrypt");

var router = express.Router();

const schema = require("../joi-schemas/teacher");
const createResponse = require("./helpers/create-response");
const controller = require("../controllers/teachers");
const passwordGen = require("./helpers/password-gen");
const sign = require("./helpers/sign");

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

router.post("/signin", async function (req, res, next) {
  const { username, password } = req.body;
  let user = await controller.findByUsername(username);

  if (!user) {
    return res.json(
      createResponse({
        error: "No user found matching credentials.",
      })
    );
  }

  if (await bcrypt.compare(password, user.password)) {
    user = user.toJSON();
    delete user.password;
    // Append a token to the user
    user.token = sign(user);
    res.json(
      createResponse({
        data: user,
      })
    );
  } else {
    res.json(
      createResponse({
        error: "Invalid credentials.",
      })
    );
  }
});

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

  const hashedPassword = await bcrypt.hash(passwordGen(), 3);

  try {
    const newTeacher = await controller.add({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json(
      createResponse({
        data: newTeacher,
      })
    );
  } catch (error) {
    if (error.message === "Possible duplicate.") {
      return res.json(
        createResponse({
          error: "There is a stream existing with similar details.",
        })
      );
    }

    next(error);
  }
});

module.exports = router;
