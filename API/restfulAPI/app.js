import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import userRoutes from "./routes/userRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import "./controllers/passport.js";
import session from "express-session";
import passport from "passport";
const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS Policy
app.use(cors());

// Database Connection
connectDB(DATABASE_URL);

//google login
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
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

// JSON
app.use(express.json());

// Load Routes
app.use("/", userRoutes);
app.use("/", adminRoute);
app.use("/", cardRoutes);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
