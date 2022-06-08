const passport = require("passport");
const localStrategy = require("./strategies/local.strategy");

passport.use(localStrategy);
