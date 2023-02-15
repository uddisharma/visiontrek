const express = require("express");
const app = express();
const router = require("../routes/route");
app.use(express.json());
const PORT = 4000;
app.get("/", (req, res) => {
  res.send("hello this is home page");
  console.log("hello this is home page");
});
app.use("/api", router);
app.listen(5000, () => {
  console.log("Listening on port");
});
