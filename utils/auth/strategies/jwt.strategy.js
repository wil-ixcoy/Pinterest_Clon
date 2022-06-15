const { Strategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_JWT,
};

const jwtStrategy = new Strategy(opts, (payload, done) => {
  return done(null, payload);
});

module.exports = jwtStrategy;
