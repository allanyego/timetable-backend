const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  day: {
    type: Number,
    required: true,
  },
  slot: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
