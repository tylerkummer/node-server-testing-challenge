const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("server", function () {
  describe("GET /", function () {
    it("should return 200 OK", function () {
      // make a GET request to / endpoint on the server
      return request(server) // return the async call to let jest know it should wait
        .get("/")
        .then((res) => {
          // assert that the HTTP status code is 200
          expect(res.status).toBe(200);
        });
    });
  });

  describe("POST /person", function () {
    beforeEach(async () => {
      await db("person").truncate(); // empty the table and reset the id back to 1
    });

    it("return 201 on success", function () {
      return request(server)
        .post("/person")
        .send({ name: "tyler" })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });

    it('should return a message saying "Person created successfully"', function () {
      return request(server)
        .post("/person")
        .send({ name: "tyler" })
        .then((res) => {
          expect(res.body.message).toBe("Person created successfully");
        });
    });

    it("add the person to the db", async function () {
      const personName = "person";

      const existing = await db("person").where({ name: personName });
      expect(existing).toHaveLength(0);

      await request(server)
        .post("/person")
        .send({ name: personName })
        .then((res) => {
          expect(res.body.message).toBe("Person created successfully");
        });
      await request(server)
        .post("/person")
        .send({ name: "sam" })
        .then((res) => {
          expect(res.body.message).toBe("Person created successfully");
        });

      const inserted = await db("person"); //.where({ name: personName });
      expect(inserted).toHaveLength(2);
    });
  });
});
