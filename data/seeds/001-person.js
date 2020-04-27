exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("person")
    .truncate()
    .then(function () {
      return knex("person").insert([
        { name: "sam" },
        { name: "tyler" },
        { name: "jordan" },
        { name: "ben" },
      ]);
    });
};
