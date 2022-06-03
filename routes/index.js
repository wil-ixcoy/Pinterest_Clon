const express = require("express");
const userRoute = require("./user.router");


function indexRouter(app) {
  const router = express.Router();
  app.use("/api", router);
  router.use("/users", userRoute);
}

module.exports = indexRouter;
