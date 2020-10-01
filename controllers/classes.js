const Class = require("../models/class");

async function add(data) {
  if (
    await Class.findOne().and([{ level: data.level }, { stream: data.stream }])
  ) {
    throw new Error("Possible duplicate.");
  }
  return await Class.create(data);
}

async function get() {
  return await Class.find();
}

module.exports = {
  add,
  get,
};
