const express = require("express");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const app = express();
require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
require("./connect.js");
const session = require("express-session");
const passport = require("passport");
require("./passport");
const port = process.env.PORT || 9090;
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "./templates/views"));
hbs.registerPartials(path.join(__dirname, "./templates/partials"));
const {
  cardModal,
  makeCardModal,
  adminModal,
  locationModal,
} = require("./modal");
const { Country, State, City } = require("country-state-city");
const { trusted } = require("mongoose");
// const ct = Country.getAllCountries();
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
// app.get("/google", (req, res) => {
//   res.render("googlelogin");
// });
// app.get("/google-login", passport.authenticate("google"), {
//   scope: ["profile", "email"],
// });

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/google-login", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
app.get("/location/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const userData = await makeCardModal.findOne({ email: username });
    if (userData.location) {
      res.send(userData.location);
    } else {
      res.status(404).send("location not found");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
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

app.get("/reset-password", (req, res) => {
  res.render("resetpass");
});
app.post("/reset-password", async (req, res) => {
  const email = req.body.email;
  const currpass = req.body.currpassword;
  const newpass = req.body.newpass;
  const cnewpass = req.body.cnewpass;
  try {
    const getdata = await cardModal.findOne({ email: email });
    if (getdata.password == currpass) {
      const setnew = await cardModal.findByIdAndUpdate(
        { _id: getdata._id },
        {
          $set: {
            password: newpass,
            cpassword: cnewpass,
          },
        }
      );
      res.status(200).send("New password has been updated");
    } else {
      res.status(404).send("Current password does not match");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
// app.get("/admin-register", (req, res) => {
//   res.render("adminregister");
// });
// app.get("/admin-verify", (req, res) => {
//   res.render("verifyadmin");
// // });
// app.post("/admin-verify/", async (req, res) => {
//   const email = req.body.email;
//   const otp = req.body.otp;

//   try {
//     const verifyData = await adminModal.findOne({ email: email });
//     if (verifyData.otp == req.body.otp) {
//       res.status(200).send("Verified successfully");
//     } else {
//       res.status(403).send("Verification failed");
//     }
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// // });
// app.post("/admin-register", async (req, res) => {
//   let config = {
//     service: "gmail",
//     auth: {
//       user: "uddibhardwaj08@gmail.com",
//       pass: "jjakxuuduudiywaz",
//     },
//   };
//   let transporter = nodemailer.createTransport(config);
//   let maingenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "VisionTrek",
//       link: "https://mailgen.js/",
//     },
//   });
//   let response = {
//     body: {
//       name: req.body.email,
//       intro: "you have received an email for admin registration ",
//       table: {
//         data: [
//           {
//             description: OTP,
//           },
//         ],
//       },
//       outro: "Valid for 5 mints",
//     },
//   };
//   let mail = maingenerator.generate(response);
//   let message = {
//     from: "uddibhardwaj08@gmail.com",
//     to: "uddibhardwaj08@gmail.com",
//     subject: "Verification Code",
//     html: mail,
//   };
//   transporter
//     .sendMail(message)
//     .then(() => {
//       return res.status(200).json({
//         msg: "OTP sent successfully",
//       });
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         error: err.message,
//       });
//     });
//   const regData = new adminModal({
//     email: req.body.email,
//     password: req.body.password,
//     cpassword: req.body.cpassword,
//     otp: OTP,
//   });
//   const saving = regData.save();
// });
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.post("/admin", async (req, res) => {
  const useremail = req.body.email;
  try {
    const regData = await adminModal.findOne({ email: useremail });
    if (
      req.body.email === regData.email &&
      regData.password == req.body.password
    ) {
      cardModal
        .find()
        .then((card) => {
          res.send("This is the list of users on our website   " + card);
        })
        .catch((error) => {
          res.status(500).send(error.message);
        });
    } else {
      res.status(403).send("You are not logged in");
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
          msg: "Your password has been sent to your email successfully",
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
app.post("/verify/:username", async (req, res) => {
  const username = req.params.username;
  const otp = req.body.otp;
  try {
    const verify = await cardModal.findOne({ email: username });
    if (otp == verify.otp) {
      res.status(200).send("verfied successfully");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
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
  console.log(socialLink);
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

app.get("/cards", (req, res) => {
  const cards = makeCardModal
    .find()
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send(err));
});
app.patch("/shareCard/:id", async (req, res) => {
  const card = req.params.id;
  // console.log("card");
  const share = await makeCardModal.findByIdAndUpdate(
    { _id: card },
    { $set: { shared: "true" } }
  );
  res.send("shared");
});
app.get("/shared-card/:username", async (req, res) => {
  const sharedCard = await makeCardModal.findOne({
    email: req.params.username,
  });
  res.send(
    sharedCard.shared == "true"
      ? sharedCard
      : "you have not shared any card yet"
  );
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
app.post("/register", async (req, res) => {
  try {
    const getdata = await cardModal.findOne({ email: req.body.email });
    if (getdata) {
      res.send("user is already registered");
    } else if (req.body.password === req.body.cpassword) {
      sendotp(req, res);
      const regData = new cardModal({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        // phoneNumber: req.body.number,
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
    // console.log(userotp);
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
app.get("/google-login", (req, res) => {
  res.render("googlelogin");
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
      location: req.body.location,
      profession: req.body.pro,
      experience: req.body.exp,
      linkedIn: req.body.linkedin,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      shared: "false",
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
