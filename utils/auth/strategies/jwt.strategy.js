const { Strategy, ExtractJwt } = require("passport-jwt");
const { config } = require("../../../config/config");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const jwtStrategy = new Strategy(opts, (payload, done) => {
  return done(null, payload);
});

module.exports = jwtStrategy;
