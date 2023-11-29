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
  console.log(req.body);
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
          type: "Directory"
        });
        const secondFiles = fs.readdirSync(
          `${path.resolve("./public")}/users/${username}/${file}`
        );
        secondFiles.forEach((file) => {
          result.push({
            name: file,
            type: "File",
            size_KiloByte: stats.size,
            extensionName: path.extname(file),
          });
        });
      }
    });
  } catch (e) {
    return null;
  }
  return result;
}

function getFile(username, file){
  try{const theFile = fs.readFileSync(
    `${path.resolve("./public")}/users/${username}/${file}`)
    return theFile;
  }
  catch(err){
    return null;
  }  
}

function getDir(username, file){
  try{const theDir = fs.readdirSync(
    `${path.resolve("./public")}/users/${username}/${file}`)
    return theDir;
  }
  catch(err){
    return null;
  }  
}


router.get("/:username/:filename", (req, res)=>{
  const stats = fs.statSync(
    `${path.resolve("./public")}/users/${req.params.username}/${req.params.filename}`
  );
  if(stats.isDirectory()){
    const currDir= getDir(req.params.username, req.params.filename)
    if(!currDir) res.status(404).send("404 not found");
  res.send(JSON.stringify(currDir))
  }
  else{
    const currFile= getFile(req.params.username, req.params.filename)
    if(!currFile) res.status(404).send("404 not found");
    res.send(JSON.stringify(currFile))
  }
})

router.patch("/:username/:filename", (req, res)=>{
  const currName= req.params.filename;
  const newName= req.body.name;

  fs.rename(currName, newName, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err}`);
    } else {
      console.log('File has been renamed successfully.');
    }
  });
})

router.delete("/:username/:filename", (req, res)=>{
  filePath= `${path.resolve("./public")}/users/${req.params.username}/${req.params.filename}`;

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log('File has been deleted successfully.');
      }
    });
  } else {
    console.log('File does not exist.');
  }

})



module.exports = router;
