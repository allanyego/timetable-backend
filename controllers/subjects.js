const Subject = require("../models/subject");

async function add(data) {
  return await Subject.create(data);
}

async function get() {
  return await Subject.find();
}

module.exports = {
  add,
  get,
};
