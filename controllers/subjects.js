const Subject = require("../models/subject");

async function add(data) {
  if (await Subject.findOne({ name: data.name })) {
    throw new Error("Possible duplicate.");
  }
  return await Subject.create(data);
}

async function get() {
  return await Subject.find();
}

module.exports = {
  add,
  get,
};
