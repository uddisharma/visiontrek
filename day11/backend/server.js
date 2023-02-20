const express = require("express");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./connect.js");
const port = process.env.PORT || 9090;
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));
hbs.registerPartials(path.join(__dirname, "./templates/partials"));
const { cardModal } = require("./modal");
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  // res.send("this is home page");
  res.render("register");
});
var OTP = Math.floor(1000 + Math.random() * 9000);
const sendotp = (req, res) => {
  let config = {
    service: "gmail",
    auth: {
      user: "uddibhardwaj08@gmail.com",
      pass: "jjakxuuduudiywaz",
    },
  };
  let transporter = nodemailer.createTransport(config);
  let maingenerator = new Mailgen({
    theme: "default",
    product: {
      name: "VisionTrek",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: req.body.email,
      intro: "you have received an email from VisionTrek ",
      table: {
        data: [
          {
            // item: "this is a demo ",

            description: OTP,
            // type: "testing",
          },
        ],
      },
      outro: "Valid for 5 mints",
    },
  };
  let mail = maingenerator.generate(response);
  let message = {
    from: "uddibhardwaj08@gmail.com",
    to: req.body.email,
    subject: "Verification Code",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({
        msg: "OTP sent successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });
};

app.post("/register", async (req, res) => {
  sendotp(req, res);
  try {
    if (req.body.password === req.body.cpassword) {
      const regData = new cardModal({
        email: req.body.email,
        phoneNumber: req.body.number,
        password: req.body.password,
        cpassword: req.body.cpassword,
        otp: OTP,
      });
      const saveregData = await regData.save();
      // res.render("login");
      // res.send("you are successfully registered");
    } else {
      res.send("password does not match");
    }
  } catch (error) {
    res.send(error.message);
  }
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    const useremail = req.body.email;
    const userpassword = req.body.password;
    const userotp = req.body.otp;
    // res.send(email);
    console.log(userotp);
    // console.log(userpassword);
    const userData = await cardModal.findOne({ email: useremail });
    console.log(userData);
    if (userData.password === userpassword && userData.otp === userotp) {
      res.send("successfully login");
      // res.render("index");
    } else {
      res.send("invalid email or password");
    }
    res.send(userData);
  } catch (error) {
    console.log(error.message);
  }
});
app.get("/get-user-profile", (req, res) => {
  res.render("getprofile");
});
app.post("/get-user-profile", async (req, res) => {
  try {
    const useremail = req.body.email;
    console.log(userotp);
    // console.log(userpassword);
    const userData = await cardModal.findOne({ email: useremail });
    console.log(userData);
    if (userData.password === userpassword && userData.otp === userotp) {
      res.send(userData);
      // res.render("index");
    } else {
      res.send("invalid email or password");
    }
    res.send(userData);
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(port, () => {
  console.log("Listening on port");
});
