const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const signup = async (req, res) => {
  //   res.status(201).json("signup success");
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "You received an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      return res.status(400).json({
        err: err.message,
      });
    });
};
const getBill = (req, res) => {
  const { useremail } = req.body;
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
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: "Deepak Sharma",
      intro: "you have received an your bill",
      table: {
        data: [
          {
            item: "Nodemailer Stack  Book",
            description: "A backend appication",
            price: "500 rs",
          },
        ],
      },
      outro: "looking forward to do more business",
    },
  };
  let mail = maingenerator.generate(response);
  let message = {
    from: "uddibhardwaj08@gmail.com",
    to: useremail,
    subject: "email sent",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({
        msg: "you have received an your bill on your mail",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });
  //   res.status(201).json("getBill success");
};

module.exports = { signup, getBill };
