const { getForm, postForm } = require("../controllers/visitors");
const express = require("express");
const router = express.Router();

router.route("/").get(getForm).post(postForm);

module.exports = router;
