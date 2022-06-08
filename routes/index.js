const express = require("express");
const userRouter = require("./user.router");
const imageRouter = require("./image.router");
const AuthRouter = require("./auth.router");

function indexRouter(app) {
  const router = express.Router();
  app.use("/api", router);
  router.use("/users", userRouter);
  router.use("/images",imageRouter)
  router.use("/auth", AuthRouter);
}

module.exports = indexRouter;
