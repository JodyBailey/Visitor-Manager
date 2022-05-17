const { deleteVisit } = require("../controllers/visitors");
const express = require("express");
const router = express.Router();

router.route("/").delete(deleteVisit);

module.exports = router;
