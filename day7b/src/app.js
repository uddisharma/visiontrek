const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
require("./db/connection");
const Student = require("./modals/student");
app.get("/", (req, res) => {
  res.send("this is a test");
});
app.post("/students", (req, res) => {
  //   res.send("this is a test for sending the data");
  console.log(req.body);
  const data = new Student(req.body);
  data
    .save()
    .then(() => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
