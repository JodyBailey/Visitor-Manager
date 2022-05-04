const {
  addNewVisitor,
  viewLastVisitor,
  deleteVisitor,
  viewVisitor,
  updateVisitor,
  deleteAllVisitors,
  listAllVisitors,
  createTable,
} = require("../src/index");
const { john } = require("../src/node-file-io");
const { pool } = require("../src/pool-config");

beforeEach(() => {
  spyOn(pool, "query");
});

describe("When the createTable() function is called", () => {
  it("should create the visitors table", () => {
    createTable();
    expect(pool.query).toHaveBeenCalledWith(
      "CREATE TABLE IF NOT EXISTS Visitors (ID SERIAL PRIMARY KEY, Full_Name varchar(100) NOT NULL, Age Integer NOT NULL, Visit_Date Date NOT NULL, Visit_Time TIME NOT NULL, Comments varchar(200), Assistant_Name varchar(100))"
    );
  });
});

describe("When the addNewVisitor() function is called", () => {
  it("should add the visitor that is passed into the addNewVisitor function to the database", () => {
    addNewVisitor(john);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO Visitors (full_name, age, visit_date, visit_time, comments, assistant_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        john.fullName,
        john.age,
        john.visitDate,
        john.visitTime,
        john.comments,
        john.assistantName,
      ]
    );
  });
});

describe("When the listAllVisitors() function is called", () => {
  it("should return all the visitors full names and IDs from the database", () => {
    listAllVisitors();
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT Full_Name, ID FROM Visitors"
    );
  });
});

describe("When the deleteVisitor() function is called", () => {
  it("should delete the visitor with the ID that is passed into the function from the database", () => {
    deleteVisitor(1);
    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM Visitors WHERE ID = $1",
      [1]
    );
  });
});

describe("When the updateVisitor() function is called", () => {
  it("should log an error if the user tried to update a visitors ID", () => {
    spyOn(console, "log");
    updateVisitor("id", 2, 1);
    expect(console.log).toHaveBeenCalledWith(
      "Error while updating visitor: Error: IDs cannot be updated"
    );
  });

  it("should verify that the visitor with the passed in ID exists, then update the visitor with the passed in ID with the new data passed into the function", () => {
    updateVisitor("full_name", "john", 1);
    expect(pool.query).toHaveBeenCalledWith("SELECT ID FROM Visitors");
  });
});

describe("When the viewVisitor() function is called", () => {
  it("should return the visitor with the ID passed into the function", () => {
    viewVisitor(1);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM Visitors WHERE ID = $1",
      [1]
    );
  });
});

describe("When the deleteAllVisitors() function is called", () => {
  it("should delete all the visitors from the database", () => {
    deleteAllVisitors();
    expect(pool.query).toHaveBeenCalledWith("DELETE FROM Visitors");
  });
});

describe("When the viewLastVisitor() function is called", () => {
  it("should view the last visitor in the database", () => {
    viewLastVisitor();
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM Visitors ORDER BY ID DESC LIMIT 1"
    );
  });
});
