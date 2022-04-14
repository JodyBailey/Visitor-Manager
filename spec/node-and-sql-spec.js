const {
  addNewVisitor,
  viewLastVisitor,
  deleteVisitor,
  viewVisitor,
  updateVisitor,
  deleteAllVisitors,
  listAllVisitors,
} = require("../src/index.js");
const { john } = require("../src/node-file-io.js");
const { pool } = require("../src/pool-config.js");

beforeEach(() => {
  spyOn(pool, "query");
});

describe("When the addNewVisitor() function is called", () => {
  it("should add the visitor that is passed into the addNewVisitor function to the database", () => {
    addNewVisitor(john);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO Visitors (full_name, age, visit_date, visit_time, comments, assistant_name) VALUES ($1, $2, $3, $4, $5, $6)",
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
  it("should return all the visitors from the database", () => {
    listAllVisitors();
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Visitors");
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
  it("should update the visitor with the passed in ID with the new data passed into the function", () => {
    updateVisitor("full_name", "Joseph Saelee", 1);
    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE Visitors SET full_name = $1 WHERE ID = $2",
      ["Joseph Saelee", 1]
    );
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
