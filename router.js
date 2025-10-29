const express = require("express");
const router = express.Router();
const lettreARRouter = require("./routers/lettre-ar.router");

router.get("/", (req, res) => res.send("App tester"));
router.use("/lettre-ar", lettreARRouter);

module.exports = router;
