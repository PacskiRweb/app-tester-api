const express = require("express");
const { testTunnel } = require("../controllers/lettre-ar.controller");

const router = express.Router();

router.get("/tunnel", testTunnel);
module.exports = router;
