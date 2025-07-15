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
    const user = {
      id: req.user.id,
      name: req.user.displayName,
      email: req.user.emails[0].value,
      image: req.user.photos[0].value,
    };

    // Generate JWT
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect to frontend with token + user
    const query = new URLSearchParams({
      token,
      user: JSON.stringify(user),
    });

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?${query.toString()}`
    );
  }
);

module.exports = router;
