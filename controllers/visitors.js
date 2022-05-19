const {
  addNewVisitor,
  deleteVisitor,
  listAllVisitors,
  deleteAllVisitors,
  viewVisitor,
  updateVisitor,
} = require("../src/index");
const { badRequestMsg, regex } = require("../src/objects");
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

    if (typeof response === "string") {
      return res.status(400).json({
        success: false,
        message: response.replace(regex.doubleQuotes, "'"),
      });
    }

    res.json({
      success: true,
      response: {
        message: "The following was added to the database",
        data: response,
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

    const response = await deleteVisitor(parseInt(id));
    res.json({
      success: true,
      response: {
        message: `Visitor with id: ${id} has been deleted`,
        data: response,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error occured while deleting visitor with id ${id}`,
    });
  }
};

const deleteAllVisits = async (req, res) => {
  try {
    await deleteAllVisitors();
    res.json({ success: true, message: "All visitors deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while deleting all visitors",
    });
  }
};

const viewAllVisits = async (req, res) => {
  try {
    const response = await listAllVisitors();
    res.json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while fetching visitors information",
    });
  }
};

const viewVisit = async (req, res) => {
  try {
    const { id } = req._params;
    const response = await viewVisitor(parseInt(id));

    if (typeof response === "string") {
      if (response === `User with ID: ${id} not found`) {
        return res.status(404).json({ success: false, message: response });
      }
      return res.status(400).json({
        success: false,
        message: response.replace(regex.doubleQuotes, "'"),
      });
    }

    res.json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({
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

    if (typeof response === "string") {
      if (response === `Visitor with ID: ${id} does not exist`) {
        return res.status(404).json({ success: false, message: response });
      }
      return res.status(400).json({
        success: false,
        message: response.replace(regex.doubleQuotes, "'"),
      });
    }

    res.json({
      success: true,
      response: {
        message: `Visitor with id: ${id} has been updated`,
        data: response,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error occured while updating visitor with id: ${id}`,
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
