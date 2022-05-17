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
const { query } = require("../src/sql-queries");

beforeEach(() => {
  spyOn(pool, "query");
  console.log = jasmine.createSpy("log");
});

describe("When the createTable() function is called", () => {
  it("should create the visitors table", () => {
    createTable();
    expect(pool.query).toHaveBeenCalledWith(query.createTable);
  });
});

describe("When the addNewVisitor() function is called", () => {
  it("should add the visitor that is passed into the addNewVisitor function to the database", () => {
    addNewVisitor(john);
    expect(pool.query).toHaveBeenCalledWith(query.addNewVisitor, [
      john.fullName,
      john.age,
      john.visitDate,
      john.visitTime,
      john.comments,
      john.assistantName,
    ]);
  });
});

describe("When the listAllVisitors() function is called", () => {
  it("should return all the visitors full names and IDs from the database", () => {
    listAllVisitors();
    expect(pool.query).toHaveBeenCalledWith(query.listAllVisitors);
  });
});

describe("When the deleteVisitor() function is called", () => {
  it("should delete the visitor with the ID that is passed into the function from the database", () => {
    deleteVisitor(1);
    expect(pool.query).toHaveBeenCalledWith(query.deleteVisitor, [1]);
  });
});

describe("When the updateVisitor() function is called", () => {
  it("should return IDs cannot be updated if the user tried to update a visitors ID and should not call pool.query", () => {
    updateVisitor("id", 2, 1).then((response) => {
      expect(response).toBe("IDs cannot be updated");
    });
    expect(pool.query).not.toHaveBeenCalled();
  });

  it("should verify that the visitor with the passed in ID exists, then update the visitor with the passed in ID with the new data passed into the function", () => {
    updateVisitor("full_name", "john", 1);
    expect(pool.query).toHaveBeenCalledWith(query.listVisitorsIDs);
  });
});

describe("When the viewVisitor() function is called", () => {
  it("should return the visitor with the ID passed into the function", () => {
    viewVisitor(1);
    expect(pool.query).toHaveBeenCalledWith(query.viewVisitor, [1]);
  });
});

describe("When the deleteAllVisitors() function is called", () => {
  it("should delete all the visitors from the database", () => {
    deleteAllVisitors();
    expect(pool.query).toHaveBeenCalledWith(query.deleteAllVisitors);
  });
});

describe("When the viewLastVisitor() function is called", () => {
  it("should view the last visitor in the database", () => {
    viewLastVisitor();
    expect(pool.query).toHaveBeenCalledWith(query.viewLastVisitor);
  });
});
