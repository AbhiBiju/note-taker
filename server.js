const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3005;
const app = express();
const apiRoutes = require("./routes/apiRoutes/index.js");
const htmlRoutes = require("./routes/htmlRoutes/index.js");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
