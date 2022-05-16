const { addNewVisitor } = require("../src/index");
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
    console.log(response);
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

module.exports = { getForm, postForm, addNewVisit };
