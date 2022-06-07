const express = require("express");
const userRoute = require("./user.router");
const imageRoute = require("./image.router");

function indexRouter(app) {
  const router = express.Router();
  app.use("/api", router);
  router.use("/users", userRoute);
  router.use("/images",imageRoute)
}

module.exports = indexRouter;
