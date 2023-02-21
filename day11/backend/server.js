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
const { cardModal, makeCardModal } = require("./modal");
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
      res.status(200).send("Password created successfully");
    } else {
      res.send("password does not match");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.get("/forgot-password", async (req, res) => {
  res.render("forgotpass");
});
app.post("/forgot-password", async (req, res) => {
  const forgotpas = await cardModal.findOne({ email: req.body.email });
  try {
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
  } catch (error) {
    res.status(404).send(error.message);
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
  try {
    const personalDetails = await makeCardModal.findOne({ email: username });
    res.send(personalDetails);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.get("/social-links/:username", async (req, res) => {
  const socialLink = req.params.username;
  try {
    const personalDetails = await makeCardModal.findOne({ email: socialLink });
    if (
      personalDetails.linkedIn ||
      personalDetails.instagram ||
      personalDetails.facebook
    ) {
      res.send(
        "LinkedIn   " +
          personalDetails.linkedIn +
          "Instagram   " +
          personalDetails.instagram +
          "Facebook    " +
          personalDetails.facebook
      );
    } else {
      res.send("there is no social link");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.get("/card/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const card = await makeCardModal.findById({ _id });
    res.status(200).send(card);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.delete("/deletecard/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteCard = await makeCardModal.findByIdAndDelete(_id);
    res.status(200).send("Card has been deleted");
  } catch (error) {
    res.status(404).send(error.message);
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
app.get("/create-work-details", async (req, res) => {
  // res.send("create-work-details");
  res.render("workdetails");
});
app.post("/create-work-details", async (req, res) => {
  try {
    const userData = new makeCardModal({
      email: req.body.email,
      name: req.body.name,
      lastname: req.body.last,
      profession: req.body.pro,
      experience: req.body.exp,
      linkedIn: req.body.linkedin,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
    });
    const user = await userData.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
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
  try {
    res.status(200).send(`http://localhost:9090/${link}`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.post("/resend", async (req, res) => {
  try {
    sendotp(req, res);
    const updateotp = await cardModal.updateOne(
      { email: req.body.email },
      { $set: { otp: OTP } }
    );
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.listen(port, () => {
  console.log("Listening on port");
});
