
const nodemailer = require("nodemailer");
const sendMail=async (req, res)=>{
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: 'nichole.donnelly18@ethereal.email',
            pass: 'DWx8CsECMQRdbqFZXy'
        },
      });
      let info = await transporter.sendMail({
        from: '"Udit Sharma 👻" <uddibhardwaj2001@gmail.com>',
        to: "uddibhardwaj08@gmail.com", 
        subject: "This is demo", 
        text: "Hello ", 
        html: "<b>Hello my name is Deepak Sharma</b>", 
      });
    
      console.log("Message sent: %s", info.messageId);
    res.json(info)
}
module.exports = sendMail;