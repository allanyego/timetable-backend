const Teacher = require("../models/teacher");

async function add(data) {
  if (
    await Teacher.findOne().or([
      { username: data.username },
      { email: data.email },
    ])
  ) {
    throw new Error("Possible duplicate.");
  }

  return await Teacher.create(data);
}

async function get() {
  return await Teacher.find();
}

async function findByUsername(username) {
  return await Teacher.findOne().or([
    { username: username },
    { email: username },
  ]);
}

module.exports = {
  add,
  get,
  findByUsername,
};
