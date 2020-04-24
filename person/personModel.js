const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(person) {
  return db("person").insert(person, "id");
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return db("person").where(id).del();
}

function getAll() {
  return db("person");
}

function findById(id) {
  return null;
}
