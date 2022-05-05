const { pool } = require("./pool-config");
const fs = require("fs");

const createTable = async () => {
  try {
    const sqlQuery = fs.readFileSync("./sql/create-table.sql", "utf-8");

    await pool.query(sqlQuery);
    console.log("Table Created");
  } catch (err) {
    console.log(`Error while creating table: ${err}`);
  }
};

const addNewVisitor = async (visitor) => {
  try {
    const sqlQuery =
      "INSERT INTO Visitors (full_name, age, visit_date, visit_time, comments, assistant_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      visitor.fullName,
      visitor.age,
      visitor.visitDate,
      visitor.visitTime,
      visitor.comments,
      visitor.assistantName,
    ];

    const response = await pool.query(sqlQuery, values);
    console.log("Visitor Added");
    return response.rows;
  } catch (err) {
    console.log(`Error while adding visitor: ${err}`);
  }
};

const listAllVisitors = async () => {
  try {
    const sqlQuery = "SELECT Full_Name, ID FROM Visitors";

    const response = await pool.query(sqlQuery);

    return response.rows.length === 0
      ? "No users in the database"
      : response.rows;
  } catch (err) {
    console.log(`Error while fetching visitors: ${err}`);
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

const updateVisitor = async (columnName, newData, visitorID) => {
  try {
    if (columnName.toLowerCase() === "id") {
      throw new Error("IDs cannot be updated");
    }

    const allVisitorIDs = [];
    const idResponse = await pool.query("SELECT ID FROM Visitors");
    idResponse.rows.forEach((value) => allVisitorIDs.push(value.id));

    if (!allVisitorIDs.includes(visitorID)) {
      throw new Error(`Visitor with ID: ${visitorID} does not exist`);
    }

    const sqlQuery = `UPDATE Visitors SET ${columnName} = $1 WHERE ID = $2`;
    const values = [newData, visitorID];

    await pool.query(sqlQuery, values);
    console.log("Visitor Updated");
  } catch (err) {
    console.log(`Error while updating visitor: ${err}`);
  }
};

const viewVisitor = async (visitorID) => {
  try {
    const sqlQuery = "SELECT * FROM Visitors WHERE ID = $1";
    const values = [visitorID];

    const response = await pool.query(sqlQuery, values);

    return response.rows.length === 0
      ? `User with ID: ${visitorID} not found`
      : response.rows;
  } catch (err) {
    console.log(`Error while fetching visitor: ${err}`);
  }
};

const deleteAllVisitors = async () => {
  try {
    const sqlQuery = "DELETE FROM Visitors";

    await pool.query(sqlQuery);
    console.log("All Visitors Deleted");
  } catch (err) {
    console.log(`Error while deleting all visitors: ${err}`);
  }
};

const viewLastVisitor = async () => {
  try {
    const sqlQuery = "SELECT * FROM Visitors ORDER BY ID DESC LIMIT 1";

    const response = await pool.query(sqlQuery);

    return response.rows.length === 0
      ? "No users in the database"
      : response.rows;
  } catch (err) {
    console.log(`Error while fetching last visitor: ${err}`);
  }
};

createTable();

module.exports = {
  addNewVisitor,
  viewLastVisitor,
  deleteVisitor,
  viewVisitor,
  updateVisitor,
  deleteAllVisitors,
  listAllVisitors,
  createTable,
};
