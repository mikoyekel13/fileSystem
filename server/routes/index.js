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
  const currUser = users.find(
    (user) =>
      user.username === req.body.username && user.password === req.body.password
  );
  if (!currUser) res.status(404).send("404 not found");
  res.status(200).send("ok");
});

router.get("/:username", (req, res) => {
  const userFiles = getUserFiles(req.params.username);
  if (!userFiles) res.status(404).send("404 not found");
  res.send(JSON.stringify(userFiles));
});

function getUserFiles(username) {
  const result = [];
  try {
    const firstFiles = fs.readdirSync(
      `${path.resolve("./public")}/users/${username}`
    );
    firstFiles.forEach(async (file) => {
      const stats = fs.statSync(
        `${path.resolve("./public")}/users/${username}/${file}`
      );
      if (!stats.isDirectory()) {
        result.push({
          name: file,
          type: "File",
          size_KiloByte: stats.size,
          extensionName: path.extname(file),
        });
      } else {
        result.push({
          name: file,
          type: "Directory",
        });
      }
    });
  } catch (e) {
    return null;
  }
  return result;
}

function getFile(username, file) {
  try {
    const theFile = fs.readFileSync(
      `${path.resolve("./public")}/users/${username}/${file}`
    );
    return theFile;
  } catch (err) {
    return null;
  }
}

function getDir(username, file) {
  try {
    const result = [];
    const theDir = fs.readdirSync(
      `${path.resolve("./public")}/users/${username}/${file}`
    );
    theDir.forEach(async (file) => {
      result.push({
        name: file,
        type: "File",
        size_KiloByte: stats.size,
        extensionName: path.extname(file),
      });
    });
    return result;
  } catch (err) {
    return null;
  }
}

router.get("/:username/:filename", (req, res) => {
  const stats = fs.statSync(
    `${path.resolve("./public")}/users/${req.params.username}/${
      req.params.filename
    }`
  );
  if (stats.isDirectory()) {
    const currDir = getDir(req.params.username, req.params.filename);
    if (!currDir) res.status(404).send("404 not found");
    res.send(JSON.stringify(currDir));
  } else {
    const currFile = getFile(req.params.username, req.params.filename);
    if (!currFile) res.status(404).send("404 not found");
    res.send(JSON.stringify(currFile));
  }
});

router.patch("/:username/:filename", (req, res) => {
  const currFile = `${path.resolve("./public")}/users/${req.params.username}/${
    req.params.filename
  }`;
  const newPath = `${path.resolve("./public")}/users/${req.params.username}/${
    req.body.name
  }`;
  fs.rename(currFile, newPath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err}`);
      res.status(404).send("404 not found");
    } else {
      console.log("File has been renamed successfully.");
      res.send("ok");
    }
  });
});

router.delete("/:username/:filename", (req, res) => {
  filePath = `${path.resolve("./public")}/users/${req.params.username}/${
    req.params.filename
  }`;

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      fs.rmdir(filePath, { recursive: true }, (err) => {
        if (err) {
          console.error(`Error removing directory: ${err}`);
          res.status(404).send("404 not found");
        } else {
          console.log("Directory has been removed successfully.");
          res.send("ok");
        }
      });
    } else {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          res.status(404).send("404 not found");
        } else {
          console.log("File has been deleted successfully.");
          res.send("ok");
        }
      });
    }
  } else {
    console.log("File does not exist.");
  }
});

router.patch("/:username/:dirname/:filename", (req, res) => {
  const currFile = `${path.resolve("./public")}/users/${req.params.username}/${
    req.params.dirname
  }/${req.params.filename}`;
  const newPath = `${path.resolve("./public")}/users/${req.params.username}/${
    req.params.dirname
  }/${req.body.name}`;
  fs.rename(currFile, newPath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err}`);
      res.status(404).send("404 not found");
    } else {
      console.log("File has been renamed successfully.");
      res.send("ok");
    }
  });
});

router.delete("/:username/:dirname/:filename", (req, res) => {
  filePath = `${path.resolve("./public")}/users/${req.params.username}/${
    req.params.dirname
  }/${req.params.filename}`;

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
        res.status(404).send("404 not found");
      } else {
        console.log("File has been deleted successfully.");
        res.send("ok");
      }
    });
  } else {
    console.log("File does not exist.");
  }
});
module.exports = router;
