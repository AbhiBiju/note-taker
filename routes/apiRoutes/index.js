const router = require("express").Router();
const fs = require("fs");

router.get("/api/notes", (req, res) => {
  fs.readFile("../../db/db.json", "utf8", function (err, data) {
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

router.post("/api/notes", (req, res) => {
  let newNote = req.body;

  fs.readFile("../../db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(`err at the database ${err}`);
    } else if (data.length > 2) {
      obj = JSON.parse(data);
      obj.push(newNote);

      fs.writeFile("../../db/db.json", JSON.stringify(obj), "utf8", (err) => {
        if (err) {
          throw err;
        }
        console.log("Note saved.");
      });
    } else {
      obj = [];
      obj.push(newNote);
      fs.writeFile("../../db/db.json", JSON.stringify(obj), "utf8", (err) => {
        if (err) {
          throw err;
        }
        console.log("Note saved.");
      });
    }
  });
});

router.delete("/api/notes/:id", (req, res) => {
  fs.readFile("../../db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let objNew = JSON.parse(data);
    for (let i = 0; i < objNew.length; i++) {
      if (req.params.id == objNew[i].id) {
        objNew.splice(i, 1);
      } else {
        console.log("Id does not match");
      }
    }
    const output = fs.writeFile("./model/db.json", JSON.stringify(objNew), (err) => {
      if (err) {
        throw err;
      }
      console.log("Note rewritten");
    });
    res.send(output);
  });
});

module.exports = router;
