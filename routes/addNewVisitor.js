const { addNewVisit } = require("../controllers/visitors");
const express = require("express");
const router = express.Router();

router.route("/").post(addNewVisit);

module.exports = router;
