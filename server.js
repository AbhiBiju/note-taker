const express = require("express");
const path = require("path");
const { readFile, writeFile } = require("fs");

const app = express();
const PORT = 3005;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.post("/notes", (req, res) => {
  const newNote = req.body;
  readFile("./db/db.json", "utf-8", (err, jsonObj) => {
    const parsedNotes = JSON.parse(jsonObj);
    try {
      console.log("1 \n", parsedNotes);
      parsedNotes.push(newNote);
      writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) => {
        console.log("2 \n", parsedNotes);
        if (err) {
          console.log(err);
        }
      });
      console.log(newNote);
    } catch {
      console.log("Error parsing JSON", err);
    }
    console.log(newNote);
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
