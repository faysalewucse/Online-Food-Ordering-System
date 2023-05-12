const express = require("express");
const router = express.Router();
const { getResRoute } = require("../controllers/private");
const { resprotect } = require("../middleware/auth");

router.route("/").get(resprotect, getResRoute);

module.exports = router;
