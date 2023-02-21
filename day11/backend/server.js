const express = require("express");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./connect.js");
const countries = require("./countries");
const port = process.env.PORT || 9090;
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));
hbs.registerPartials(path.join(__dirname, "./templates/partials"));
const { cardModal } = require("./modal");
var OTP = Math.floor(1000 + Math.random() * 9000);
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/create-password", (req, res) => {
  res.render("createpass");
});
app.post("/create-password", async (req, res) => {
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
      res.send("Password created successfully");
    } else {
      res.send("password does not match");
    }
  } catch (error) {
    res.send(error.message);
  }
});
app.get("/forgot-password", async (req, res) => {
  res.render("forgotpass");
});
app.post("/forgot-password", async (req, res) => {
  const forgotpas = await cardModal.findOne({ email: req.body.email });
  if (forgotpas) {
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
              description: "Your password is" + forgotpas.password,
            },
          ],
        },
        outro: "you password",
      },
    };
    let mail = maingenerator.generate(response);
    let message = {
      from: "uddibhardwaj08@gmail.com",
      to: req.body.email,
      subject: "Password",
      html: mail,
    };
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          msg: "Password sent successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  } else {
    res.send("email address does not exist");
  }
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/resend", (req, res) => {
  res.render("resend");
});
app.get("/personal-details/:username", async (req, res) => {
  const username = req.params.username;
  const personalDetails = await cardModal.findOne({ email: username });
  res.send(personalDetails);
});
app.get("/social-links/:username", async (req, res) => {
  const socialLink = req.params.username;
  const personalDetails = await cardModal.findOne({ email: socialLink });
  if (personalDetails.links) {
    res.send(personalDetails.links);
  } else {
    res.send("there is no social link");
  }
});
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
            description: OTP,
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
    console.log(userotp);
    const userData = await cardModal.findOne({ email: useremail });
    console.log(userData);
    if (userData.password === userpassword && userData.otp === userotp) {
      res.send("successfully login");
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
    const userData = await cardModal.findOne({ email: useremail });
    if (userData) {
      res.render("userDetails", {
        name: userData.email,
        phone: userData.phoneNumber,
      });
    } else {
      res.send("invalid user");
    }
  } catch (error) {
    console.log(error.message);
  }
});
app.get("/get-user-profile/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await cardModal.findById(id);
    if (userData) {
      res.render("userDetails", {
        name: userData.email,
        phone: userData.phoneNumber,
      });
    } else {
      res.send("invalid user");
    }
  } catch (error) {
    console.log(error.message);
  }
});
app.get("/:link", (req, res) => {
  const link = req.params.link;
  res.send(`http://localhost:9090/${link}`);
});
app.post("/resend", async (req, res) => {
  sendotp(req, res);
  const updateotp = await cardModal.updateOne(
    { email: req.body.email },
    { $set: { otp: OTP } }
  );
});
app.listen(port, () => {
  console.log("Listening on port");
});
