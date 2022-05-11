const { addNewVisitor } = require("../src/index");
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
    res.status(400).json({
      success: false,
      message:
        "Error while adding visitor. Make sure the inputs matches the correct formats",
      formats: {
        fullName: ["Any Characters of Any Format", "Max Length 100"],
        age: "Any One Number",
        visitDate: "yyyy-mm-dd",
        visitTime: "24 Hour Time",
        comments: ["Any Characters of Any Format", "Max Length 200"],
        assistantName: ["Any Characters of Any Format", "Max Length 100"],
      },
    });
  }
};

module.exports = { getForm, postForm };
