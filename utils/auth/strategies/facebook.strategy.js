const strategy = require("passport-facebook");
const passport = require("passport");
require("dotenv").config();

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

const UserService = require("../../../services/user.service");
const AuthService = require("../../../services/auth.service");

let service = new UserService();
let authService = new AuthService();

const FacebookStrategy = strategy.Strategy;

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://infinite-meadow-99672.herokuapp.com/api/auth/facebook",
    profileFields: ["email"],
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await service.findByEmail(profile.emails[0].value);
      if (!user) {
        return done(null, "El email no esta registrado");
      } else {
        let token = await authService.createTokenJWT(user);
        return done(null, token);
      }
    } catch (e) {
      return done(e, null);
    }
  }
);

module.exports = facebookStrategy;
