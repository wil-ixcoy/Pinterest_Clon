const express = require("express");
const validatorHandler = require("./middlewares/validator.handler");
const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("./schemas/user.schema");

const router = express.Router();

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  (req, res, next) => {
    res.send("Hello World!");
  }
);
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  (req, res, next) => {
    res.send("Hello World!");
  }
);
router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  (req, res, next) => {
    res.send("Hello World!");
  }
);
router.delete(
  "/:id",
  validatorHandler(deleteUserSchema, "params"),
  (req, res) => {
    res.send("Hello World!");
  }
);
module.exports = router;
