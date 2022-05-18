const fs = require("fs");
const path = require("path");

const query = {
  createTable: fs.readFileSync(
    path.join(__dirname, "..", "sql", "create-table.sql"),
    "utf-8"
  ),
  addNewVisitor:
    "INSERT INTO Visitors (full_name, age, visit_date, visit_time, comments, assistant_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
  listAllVisitors: "SELECT Full_Name, ID FROM Visitors",
  deleteVisitor: "DELETE FROM Visitors WHERE ID = $1 RETURNING *",
  listVisitorsIDs: "SELECT ID FROM Visitors",
  viewVisitor: "SELECT * FROM Visitors WHERE ID = $1",
  deleteAllVisitors: "DELETE FROM Visitors",
  viewLastVisitor: "SELECT * FROM Visitors ORDER BY ID DESC LIMIT 1",
};

const badRequestMsg = {
  success: false,
  response: {
    message:
      "Error in formats of data. Make sure the data matches the correct formats",
    formats: {
      fullName: ["Any Characters of Any Format", "Max Length 100"],
      age: "Any One Number",
      visitDate: "yyyy-mm-dd",
      visitTime: "24 Hour Time",
      comments: ["Any Characters of Any Format", "Max Length 200"],
      assistantName: ["Any Characters of Any Format", "Max Length 100"],
    },
  },
};

const regex = {
  doubleQuotes: /"/g,
};

module.exports = { query, badRequestMsg, regex };
