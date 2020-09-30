const Lesson = require("../models/lesson");

async function add(data) {
  return await Lesson.create(data);
}

module.exports = {
  add,
};
