const {
  addNewVisitor,
  deleteVisitor,
  listAllVisitors,
  deleteAllVisitors,
  viewVisitor,
  updateVisitor,
} = require("../src/index");
const { badRequestMsg } = require("../src/bad-request-message");
const path = require("path");

const getForm = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
};

const postForm = async (req, res) => {
  try {
    const { fullName, age, visitDate, visitTime, comments, assistantName } =
      req.body;
    const response = await addNewVisitor(req.body);

    res.render("index", {
      id: response[0].id,
      fullName: fullName,
      age: age,
      visitDate: visitDate,
      visitTime: visitTime,
      comments: comments,
      assistantName: assistantName,
    });
  } catch (err) {
    res.status(400).json(badRequestMsg);
  }
};

const addNewVisit = async (req, res) => {
  try {
    const response = await addNewVisitor({
      fullName: req.body.fullName,
      age: req.body.age,
      visitDate: req.body.visitDate,
      visitTime: req.body.visitTime,
      comments: req.body.comments || "",
      assistantName: req.body.assistantName || "",
    });
    res.json({
      success: true,
      response: {
        message: "The following was added to the database",
        data: {
          id: response[0].id,
          fullName: response[0].full_name,
          age: response[0].age,
          visitDate: response[0].visit_date,
          visitTime: response[0].visit_time,
          comments: response[0].comments,
          assistantName: response[0].assistant_name,
        },
      },
    });
  } catch (err) {
    res.status(400).json(badRequestMsg);
  }
};

const deleteVisit = async (req, res) => {
  try {
    const { id } = req._params;
    const allVisitors = await listAllVisitors();
    const visitorIDs = allVisitors.map((visitor) => visitor.id);

    if (!visitorIDs.includes(parseInt(id))) {
      return res
        .status(404)
        .json({ success: false, message: `No visitor with id: ${id}` });
    }

    await deleteVisitor(parseInt(id));
    res.json({
      success: true,
      message: `Visitor with id: ${id} has been deleted`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured while deleting visitor",
    });
  }
};

const deleteAllVisits = async (req, res) => {
  try {
    await deleteAllVisitors();
    res.json({ success: true, message: "All visitors deleted" });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured while deleting all visitors",
    });
  }
};

const viewAllVisits = async (req, res) => {
  try {
    const allVisitors = await listAllVisitors();
    res.json({ success: true, data: allVisitors });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured while fetching visitors info",
    });
  }
};

const viewVisit = async (req, res) => {
  try {
    const { id } = req._params;
    const response = await viewVisitor(parseInt(id));

    if (typeof response !== "object") {
      return res.status(404).json({ success: false, message: response });
    }

    res.json({ success: true, data: response });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error occured while fetching visitor with id ${id}`,
    });
  }
};

const updateVisit = async (req, res) => {
  try {
    const { id } = req._params;
    const columnName = Object.keys(req.body)[0];
    const newData = Object.values(req.body)[0];

    const response = await updateVisitor(columnName, newData, parseInt(id));
    if (typeof response !== "object") {
      return res
        .status(400)
        .json({ success: false, message: response.replace(/"/g, "'") });
    }
    res.json({ success: true, data: response });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error occured while updating visitor with id ${id}`,
    });
  }
};

module.exports = {
  getForm,
  postForm,
  addNewVisit,
  deleteVisit,
  deleteAllVisits,
  viewAllVisits,
  viewVisit,
  updateVisit,
};
