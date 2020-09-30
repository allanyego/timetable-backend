const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
  stream: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stream",
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

module.exports = mongoose.model("Class", classSchema);
