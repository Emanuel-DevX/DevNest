const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
require("./auth/google"); // Load Google Strategy
const authRoutes = require("./routes/auth");

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to DevNest");
});

app.listen(PORT, () => {
  console.log(`All good server is running on ${API_URL}`);
});
