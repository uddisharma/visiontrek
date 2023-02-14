const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
const port = process.env.PORT || 4000;
require("./db/connection");
const hbs = require("hbs");
const Student = require("./modals/student");
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/students", async (req, res) => {
  //   res.send("this is a test for sending the data");

  //   res.send(req.body);

  const data = new Student({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    number: req.body.number,
  });
  const sent = await data.save();
  res.send(sent);

  //   const data = new Student(req.body);
  //   data
  //     .save()
  //     .then(() => {
  //       res.status(201).send(data);
  //     })
  //     .catch((err) => {
  //       res.status(400).send(err);
  //     });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
