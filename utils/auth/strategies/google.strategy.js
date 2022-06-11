/* create a trategy with google */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const emails =["wiliamsg200295@gmail.com"]
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOGOLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google",
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile.emails[0].value);
    const response = emails.includes(profile.emails[0].value);

    if (response) {
      done(null, profile);
    } else {
      emails.push(profile.emails[0].value);
      done(null, profile);
    }
  }
);

module.exports = googleStrategy;
