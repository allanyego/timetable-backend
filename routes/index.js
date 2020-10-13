var express = require("express");

const teachersRouter = require("./teachers");
const subjectsRouter = require("./subjects");
const classesRouter = require("./classes");
const lessonsRouter = require("./lessons");
const streamsRouter = require("./streams");

var router = express.Router();

router.use("/teachers", teachersRouter);
router.use("/subjects", subjectsRouter);
router.use("/classes", classesRouter);
router.use("/lessons", lessonsRouter);
router.use("/streams", streamsRouter);

const burgers = ["turkey", "salmon", "beef", "veggies"];

router.get("/buggers", (req, res) => {
  setTimeout(() => {
    res.json({
      status: "Success",
      data: burgers,
    });
  }, 7000);
});

module.exports = router;
