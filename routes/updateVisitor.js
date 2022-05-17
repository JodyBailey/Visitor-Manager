const { updateVisit } = require("../controllers/visitors");
const express = require("express");
const router = express.Router();

router.route("/").put(updateVisit);

module.exports = router;
