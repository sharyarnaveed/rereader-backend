const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIETNSECRET,
      callbackURL: "http://localhost:3000/api/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          password: profile.id,
          profilepic: profile.photos[0].value,
          provider: profile.provider,
        };
        // console.log(newUser);
        const salt = await bcrypt.genSalt(12);
        const hashedpassword = await bcrypt.hash(newUser.password, salt);
        const userfound = await User.findOne({
          where: {
            email: newUser.email,
          },
        });

        if (userfound) {
          done(null, userfound);
        } else {
          try {
            const user = await User.create({
              firstname: newUser.firstName,
              lastname: newUser.lastName,
              email: newUser.email,
              password: hashedpassword,
              status: "verified",
            });

            done(null, user);
          } catch (error) {
            console.log(error, "error in creating user");
          }
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
