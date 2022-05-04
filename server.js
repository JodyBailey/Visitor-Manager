const express = require("express");
const newVisit = require("./routes/new_visit");
const path = require("path");
const app = express();
const PORT = 3256;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/new_visit", newVisit);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
