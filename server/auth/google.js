const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Project = require("../models/Project");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Check if user exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create user if doesn't exist
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await Project.create({
            title: "General",
            owner: user._id,
            participants: [user.id],
            protected: true,
          });
        }

        done(null, user); // pass user to session
      } catch (err) {
        done(err, null);
      }
    }
  )
);
