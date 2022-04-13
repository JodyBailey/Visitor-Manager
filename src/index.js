const { pool } = require("./pool.config.js");
const { john } = require("./node-file-io.js");

const addNewVisitor = async (visitor) => {
  try {
    const sqlQuery =
      "INSERT INTO Visitors (full_name, age, visit_date, visit_time, comments, assistant_name) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
      visitor.fullName,
      visitor.age,
      visitor.visitDate,
      visitor.visitTime,
      visitor.comments,
      visitor.assistantName,
    ];

    await pool.query(sqlQuery, values);
    console.log("Visitor Added");
  } catch (err) {
    console.log(`Error while adding visitor: ${err}`);
  }
};

const listAllVisitors = async () => {
  try {
    const sqlQuery = "SELECT * FROM Visitors";

    const response = await pool.query(sqlQuery);
    return response.rows;
  } catch (err) {
    console.log(`Error while listing visitors: ${err}`);
  }
};

const deleteVisitor = async (visitorID) => {
  try {
    const sqlQuery = "DELETE FROM Visitors WHERE ID = $1";
    const value = [visitorID];

    await pool.query(sqlQuery, value);
    console.log("Visitor Deleted");
  } catch (err) {
    console.log(`Error while deleting visitors: ${err}`);
  }
};

const updateVisitor = async (visitorID, newData) => {};

let data = {
  full_name: "Dave Chapel",
  comments: "Actually pretty good",
};

let arr = [];

for (let key in data) {
  arr.push(`${key} = ${data[key]}`);
}

console.log(arr);
