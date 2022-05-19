const { viewAllVisits } = require("../controllers/visitors");
const express = require("express");
const router = express.Router();

router.route("/").get(viewAllVisits);

module.exports = router;
