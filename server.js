const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/new_visit", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
