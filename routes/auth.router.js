const express = require("express");
const AuthService = require("../services/auth.service");
const passport = require("passport");

const router = express.Router();
const service = new AuthService();

/* crear */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = await service.createTokenJWT(req.user);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook"),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);
module.exports = router;
