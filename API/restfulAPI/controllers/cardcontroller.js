// import CardModel from "../models/Card.js";
import CardModel from "../models/Card.js";
class Cardcontroller {
  static create_card = async (req, res) => {
    const {
      email,
      name,
      lastname,
      location,
      profession,
      experience,
      linkedIn,
      instagram,
      facebook,
    } = req.body;
    if (
      email &&
      name &&
      lastname &&
      location &&
      profession &&
      experience &&
      linkedIn &&
      instagram &&
      facebook
    ) {
      const card = new CardModel({
        email: email,
        name: name,
        lastname: lastname,
        location: location,
        profession: profession,
        experience: experience,
        linkedIn: linkedIn,
        instagram: instagram,
        facebook: facebook,
        shared: false,
      });
      await card.save();
      res.send("card is created successfully");
    } else {
      res.send("All fields are required");
    }
  };
  static location = async (req, res) => {
    const username = req.params.username;
    try {
      const userData = await CardModel.findOne({ email: username });
      if (userData.location) {
        res.send(userData.location);
      } else {
        res.status(404).send("location not found");
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  static personalDetails = async (req, res) => {
    const username = req.params.username;
    try {
      const personalDetails = await CardModel.findOne({ email: username });
      res.send(personalDetails);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  static socialLink = async (req, res) => {
    const socialLink = req.params.username;
    console.log(socialLink);
    try {
      const personalDetails = await CardModel.findOne({ email: socialLink });
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
  };
  static Cards = async (req, res) => {
    const username = req.params.username;
    const cards = CardModel.find({ email: username })
      .then((cards) => res.send(cards))
      .catch((err) => res.status(500).send(err));
  };
  static ShareCard = async (req, res) => {
    const card = req.params.id;
    // console.log("card");
    const share = await CardModel.findByIdAndUpdate(
      { _id: card },
      { $set: { shared: true } }
    );
    res.send("shared");
  };
  static SharedCard = async (req, res) => {
    const sharedCard = await CardModel.find({
      email: req.params.username,
    });
    res.send(
      // sharedCard
      (sharedCard.shared = true
        ? sharedCard
        : // ? // ? sharedCard
          //   async.each(sharedCard, function iteratee(card, nextCard) {
          //     console.log("==========Started " + card + "==============");
          //   })
          "you have not shared any card yet")
    );
  };
  static Card = async (req, res) => {
    const _id = req.params.id;
    try {
      const card = await CardModel.findById({ _id });
      res.status(200).send(card);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  static deleteCard = async (req, res) => {
    const _id = req.params.id;
    try {
      const deleteCard = await CardModel.findByIdAndDelete(_id);
      res.status(200).send("Card has been deleted");
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  static link = (req, res) => {
    const link = req.params.link;
    try {
      res.status(200).send(`http://localhost:9090/${link}`);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
}
export default Cardcontroller;
