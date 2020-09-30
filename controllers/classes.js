const Class = require("../models/class");

async function add(data) {
  return await Class.create(data);
}

async function get() {
  return await Class.find();
}

module.exports = {
  add,
  get,
};
