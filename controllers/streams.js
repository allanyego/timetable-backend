const Stream = require("../models/stream");

async function add(data) {
  return await Stream.create(data);
}

async function get() {
  return await Stream.find();
}

module.exports = {
  add,
  get,
};
