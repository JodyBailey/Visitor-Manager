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
    console.log("Visitor added");
  } catch (err) {
    console.log(`Error while adding visitor: ${err}`);
  }
};
