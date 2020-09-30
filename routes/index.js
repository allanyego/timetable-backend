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

module.exports = router;
