const router = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    let noteData = [];
    if (err) {
      throw err;
    }
    if (data.length > 0) {
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
    } else if (data.length > 0) {
      obj = JSON.parse(data);
      newNote.id = uuid.v4().substring(0, 4);
      obj.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(obj), "utf8", (err) => {
        if (err) {
          throw err;
        }
        console.log("Note saved.");
        fs.readFile("./db/db.json", "utf8", function (err, data) {
          let noteData = [];
          if (err) {
            throw err;
          }
          if (data.length > 0) {
            noteData = JSON.parse(data);
            res.json(noteData);
          } else {
            console.log("No notes saved");
          }
        });
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
      res.json(newNote);
    }
  });
});

router.delete("/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let objNew = JSON.parse(data);

    const deleteThis = objNew.findIndex((note) => note.id === req.params.id);

    objNew.splice(deleteThis, 1);

    const output = fs.writeFile("./db/db.json", JSON.stringify(objNew), (err) => {
      if (err) {
        throw err;
      }
      console.log("Note rewritten");
    });
    res.json(output);
  });
});

module.exports = router;
