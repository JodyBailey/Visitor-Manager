const { deleteAllVisits } = require("../controllers/visitors");
const express = require("express");
const router = express.Router();

router.route("/").delete(deleteAllVisits);

module.exports = router;
