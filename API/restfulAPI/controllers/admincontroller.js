import CardModel from "../models/Card.js";
import adminModal from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
class adminController {
  // static adminreg = async (req, res) => {
  //   const { name, email, password, password_confirmation } = req.body;
  //   if (name && email && password && password_confirmation) {
  //     if (password === password_confirmation) {
  //       try {
  //         const salt = await bcrypt.genSalt(10);
  //         const hashPassword = await bcrypt.hash(password, salt);
  //         const doc = new adminModal({
  //           name: name,
  //           email: email,
  //           password: hashPassword,
  //         });
  //         await doc.save();
  //         const saved_user = await adminModal.findOne({ email: email });
  //         // Generate JWT Token
  //         const token = jwt.sign(
  //           { userID: saved_user._id },
  //           process.env.JWT_SECRET_KEY,
  //           { expiresIn: "30d" }
  //         );
  //         res.status(201).send({
  //           status: "success",
  //           message: "Registration Success",
  //           token: token,
  //         });
  //       } catch (error) {
  //         console.log(error);
  //         res.send({ status: "failed", message: "Unable to Register" });
  //       }
  //     } else {
  //       res.send({
  //         status: "failed",
  //         message: "Password and Confirm Password doesn't match",
  //       });
  //     }
  //   } else {
  //     res.send({ status: "failed", message: "All fields are required" });
  //   }
  // };

  static Admin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await adminModal.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            UserModel.find()
              .then((card) => {
                res.json({ msg: "Login Success", token: token, users: card });
              })
              .catch((error) => {
                res.status(500).send(error.message);
              });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };
}
export default adminController;
