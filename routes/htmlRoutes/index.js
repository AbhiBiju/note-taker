const { join } = require("path");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../../public/index.html"));
});

router.get("/notes", (req, res) => {
  res.sendFile(join(__dirname, "../../public/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../../public/notes.html"));
});

module.exports = router;
