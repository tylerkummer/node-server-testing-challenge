const express = require("express");

const Person = require("../person/personModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/person", (req, res) => {
  Person.getAll()
    .then((person) => {
      res.status(200).json(person);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.post("/person", (req, res) => {
  const personInfo = req.body;

  Person.insert(personInfo)
    .then((ids) => {
      res.status(201).json({ message: "Person created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error.message });
    });
});

server.delete("/person/:id", (req, res) => {
  Person.remove(req.params)
    .then((id) => {
      res.status(204).json({ message: "Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = server;
