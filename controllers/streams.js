const Stream = require("../models/stream");

async function add(data) {
  if (await Stream.findOne(data)) {
    throw new Error("Possible duplicate.");
  }

  return await Stream.create(data);
}

async function get() {
  return await Stream.find();
}

module.exports = {
  add,
  get,
};
