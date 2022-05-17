const { pool } = require("./pool-config");
const { query } = require("./sql-queries");

const createTable = async () => {
  try {
    await pool.query(query.createTable);
    console.log("Create Table Query Executed Successfully");
  } catch (err) {
    console.log(`Error while creating table: ${err}`);
  }
};

const addNewVisitor = async (visitor) => {
  try {
    const values = [
      visitor.fullName,
      visitor.age,
      visitor.visitDate,
      visitor.visitTime,
      visitor.comments,
      visitor.assistantName,
    ];

    const response = await pool.query(query.addNewVisitor, values);
    console.log("Visitor Added");
    return response.rows;
  } catch (err) {
    console.log(`Error while adding visitor: ${err}`);
  }
};

const listAllVisitors = async () => {
  try {
    const response = await pool.query(query.listAllVisitors);

    return response.rows.length === 0
      ? "No users in the database"
      : response.rows;
  } catch (err) {
    console.log(`Error while fetching visitors: ${err}`);
  }
};

const deleteVisitor = async (visitorID) => {
  try {
    const value = [visitorID];

    await pool.query(query.deleteVisitor, value);
    console.log("Visitor Deleted");
  } catch (err) {
    console.log(`Error while deleting visitors: ${err}`);
  }
};

const updateVisitor = async (columnName, newData, visitorID) => {
  try {
    if (columnName.toLowerCase() === "id") {
      return "IDs cannot be updated";
    }

    const allVisitorIDs = [];
    const idResponse = await pool.query(query.listVisitorsIDs);
    idResponse.rows.forEach((value) => allVisitorIDs.push(value.id));

    if (!allVisitorIDs.includes(visitorID)) {
      return `Visitor with ID: ${visitorID} does not exist`;
    }

    const sqlQuery = `UPDATE Visitors SET ${columnName} = $1 WHERE ID = $2 RETURNING *`;
    const values = [newData, visitorID];

    const response = await pool.query(sqlQuery, values);
    console.log("Visitor Updated");
    return response.rows;
  } catch (err) {
    console.log(`Error while updating visitor: ${err}`);
    return err.message;
  }
};

const viewVisitor = async (visitorID) => {
  try {
    const values = [visitorID];
    const response = await pool.query(query.viewVisitor, values);

    return response.rows.length === 0
      ? `User with ID: ${visitorID} not found`
      : response.rows;
  } catch (err) {
    console.log(`Error while fetching visitor: ${err}`);
  }
};

const deleteAllVisitors = async () => {
  try {
    await pool.query(query.deleteAllVisitors);
    console.log("All Visitors Deleted");
  } catch (err) {
    console.log(`Error while deleting all visitors: ${err}`);
  }
};

const viewLastVisitor = async () => {
  try {
    const response = await pool.query(query.viewLastVisitor);

    return response.rows.length === 0
      ? "No users in the database"
      : response.rows;
  } catch (err) {
    console.log(`Error while fetching last visitor: ${err}`);
  }
};

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
