const passport = require("passport");
const localStrategy = require("./strategies/local.strategy");
const jwtStrategy = require("./strategies/jwt.strategy");
const googleStrategy = require("./strategies/google.strategy");

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);
