require("dotenv").config();
const express = require("express");
const app = express();

const ip = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 9597;

const router = require("./router");
const { checkBearerToken } = require("./middlewares/authorization");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(checkBearerToken);
app.use("/api", router);
app.listen(port, () => {
  console.log(`App listening on port http://${ip}:${port}/api`);
});
