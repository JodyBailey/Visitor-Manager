const badRequestMsg = {
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
};

module.exports = {
  badRequestMsg,
};
