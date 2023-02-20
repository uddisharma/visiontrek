const express = require("express");
const app = express();
require("./connect.js");
app.get("/", (req, res) => {
  res.send("this is home page");
});
app.post("/register", (req, res) => {});
app.listen(9090, () => {
  console.log("Listening on port");
});
