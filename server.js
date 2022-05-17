const { createTable } = require("./src/index");
const getParams = require("./middleware/getParams");
const newVisit = require("./routes/new_visit");
const addVisit = require("./routes/addNewVisitor");
const deleteVisit = require("./routes/deleteVisitor");
const deleteAllVisits = require("./routes/deleteAllVisitors");
const viewAllVisits = require("./routes/viewVisitors");
const viewVisit = require("./routes/viewVisitor");
const updateVisit = require("./routes/updateVisitor");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3256;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/new_visit", newVisit);
app.use("/addNewVisitor", addVisit);
app.use("/viewVisitors", viewAllVisits);
app.use("/deleteAllVisitors", deleteAllVisits);
app.use("/updateVisitor:id", getParams, updateVisit);
app.use("/viewVisitor:id", getParams, viewVisit);
app.use("/deleteVisitor:id", getParams, deleteVisit);
createTable();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
