const router = require("express").Router();
const { readFile, writeFile } = require("fs");
const { v4 } = require("uuid");

//GET ROUTE
router.get("/notes", (req, res) => {
  readFile("./db/db.json", "utf8", function (err, data) {
    let noteData = [];
    if (err) {
      throw err;
    }
    if (data.length > 0) {
      noteData = JSON.parse(data); //if notes array is NOT empty
      res.json(noteData); //sends noteData array as json response to front end
    } else {
      console.log("No notes saved");
    }
  });
});

//POST ROUTE
router.post("/notes", (req, res) => {
  let newNote = req.body; //equals newNote variable to the note object with title and text keys, reference public/assets/js/index.js line 73

  readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(`err at the database ${err}`);
    } else {
      if (data.length > 0) {
        obj = JSON.parse(data); //if db.json is NOT empty
      } else {
        obj = []; //if IS empty
      }

      newNote.id = v4().substring(0, 4); //only gets the first 4 characters of the very long id string, adds that 4 char id to the new Note object
      obj.push(newNote); //push new note to obj array

      writeFile("./db/db.json", JSON.stringify(obj), "utf8", (err) => {
        //writes the stringified obj array to db.json
        if (err) {
          throw err;
        }
        console.log("Note saved.");

        //Refreshes the notes list again with the res.json(noteData) -sends back the notes as response-
        readFile("./db/db.json", "utf8", function (err, data) {
          let noteData = [];
          if (err) {
            throw err;
          } //if notes array is NOT empty
          if (data.length > 0) {
            noteData = JSON.parse(data); //parses db.json to mutable json format, equals it to noteData array
            res.json(noteData);
          } else {
            console.log("No notes saved"); //if IS empty
          }
        });
      });
    }
  });
});

//DELETE ROUTE
router.delete("/notes/:id", (req, res) => {
  readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let objNew = JSON.parse(data); //parses db.json into mutable json format

    const deleteThis = objNew.findIndex((note) => note.id === req.params.id); //searches db for matching note id, returns its index
    objNew.splice(deleteThis, 1); //deletes that specific note object from array of note objects

    const output = writeFile("./db/db.json", JSON.stringify(objNew), (err) => {
      if (err) {
        throw err;
      }
      console.log("Note rewritten");
    });
    res.send(output); //sends the rewritten db file as response...? not sure but it only works if this is here... haha
  });
});

module.exports = router;
