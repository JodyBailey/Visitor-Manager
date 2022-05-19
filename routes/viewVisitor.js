const { viewVisit } = require("../controllers/visitors");
const express = require("express");
const router = express.Router();

router.route("/").get(viewVisit);

module.exports = router;
