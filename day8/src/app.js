const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const router = require("../routes/route");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.get("/", (req, res) => {
  res.render("index");
});
// const PORT = 4000;
// app.get("/", (req, res) => {
//   res.send("hello this is home page");
//   console.log("hello this is home page");
// });
app.use("/api", router);
app.listen(5000, () => {
  console.log("Listening on port");
});
