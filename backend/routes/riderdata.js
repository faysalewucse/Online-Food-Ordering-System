const express = require("express");
const router = express.Router();
const { getRiderRoute } = require("../controllers/private");
const { riderprotect } = require("../middleware/auth");

router.route("/").get(riderprotect, getRiderRoute);

module.exports = router;
