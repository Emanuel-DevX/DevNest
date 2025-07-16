// server/routes/auth.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Route: GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route: GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token + user
    const frontendURL = `${
      process.env.FRONTEND_URL
    }/auth/callback?token=${token}&user=${encodeURIComponent(
      JSON.stringify({
        name: user.name,
        email: user.email,
        image: user.image,
      })
    )}`;

    res.redirect(frontendURL);
  }
);

module.exports = router;
