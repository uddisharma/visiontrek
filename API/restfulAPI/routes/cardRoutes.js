import express from "express";
const router = express.Router();
import Cardcontroller from "../controllers/cardcontroller.js";
router.post("/create-card", Cardcontroller.create_card);
router.get("/location/:username", Cardcontroller.location);
router.get("/personal-details/:username", Cardcontroller.personalDetails);
router.get("/social-links/:username", Cardcontroller.socialLink);
router.get("cards/:username", Cardcontroller.Cards);
router.patch("/shareCard/:id", Cardcontroller.ShareCard);
router.get("/shared-card/:username", Cardcontroller.SharedCard);
router.get("/card/:id", Cardcontroller.Card);
router.delete("/deleteCard/:id", Cardcontroller.deleteCard);
router.get("/:link", Cardcontroller.link);
export default router;