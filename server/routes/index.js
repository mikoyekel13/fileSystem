var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

const users = [
  {
    username: "miko",
    password: "1234",
  },
  {
    username: "ayelet",
    password: "1234",
  },
  {
    username: "shir",
    password: "1234",
  },
  {
    username: "shoham",
    password: "1234",
  },
];

router.post("/", (req, res) => {
  // const userBody = JSON.parse(req.body);
  console.log(req.body);
  const currUser = users.find(
    (user) =>
      user.username === req.body.username && user.password === req.body.password
  );
  if (!currUser) res.status(404).send("404 not found");
  res.status(200).send("ok");
});

router.get("/:username", (req, res) => {
  res.send(getUserFiles(req.params.username));
});

function getUserFiles(username) {
  const result = [];
  const firstFiles = fs.readdirSync(
    `${path.resolve("./public")}/users/${username}`
  );
  firstFiles.forEach(async (file) => {
    const stats = fs.statSync(
      `${path.resolve("./public")}/users/${username}/${file}`
    );
    if (!stats.isDirectory()) {
      result.push({ name: file, type: "File" });
    } else {
      result.push({ name: file, type: "Directory" });
      const secondFiles = fs.readdirSync(
        `${path.resolve("./public")}/users/${username}/${file}`
      );
      secondFiles.forEach((file) => {
        result.push({ name: file, type: "File" });
      });
    }
  });
  return result;
}

module.exports = router;
