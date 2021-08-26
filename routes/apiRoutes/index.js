const router = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    let noteData = [];
    if (err) {
      throw err;
    }
    if (data.length > 2) {
      noteData = JSON.parse(data);
      res.json(noteData);
    } else {
      console.log("No notes saved");
    }
  });
});

router.post("/notes", (req, res) => {
  let newNote = req.body;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(`err at the database ${err}`);
    } else if (data.length > 2) {
      obj = JSON.parse(data);
      newNote.id = uuid.v4().substring(0, 4);
      obj.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(obj), "utf8", (err) => {
        if (err) {
          throw err;
        }
        console.log("Note saved.");
      });
    } else {
      obj = [];
      newNote.id = uuid.v4().substring(0, 4);
      obj.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(obj), "utf8", (err) => {
        if (err) {
          throw err;
        }
        console.log("Note saved.");
      });
    }
  });
});

router.delete("/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    let objNew = JSON.parse(data);
    console.log(objNew);
    for (let i = 0; i < objNew.length; i++) {
      if (req.params.id == objNew[i].id) {
        objNew.splice(i, 1);
      } else {
        console.log("Id does not match");
      }
    }
    const output = fs.writeFile("./db/db.json", JSON.stringify(objNew), (err) => {
      if (err) {
        throw err;
      }
      console.log("Note rewritten");
    });
    res.send(output);
  });
});

module.exports = router;
