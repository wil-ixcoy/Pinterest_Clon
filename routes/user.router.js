const express = require("express");
const passport = require("passport");
const UserService = require("../services/user.service");
const AuthService = require("../services/auth.service");
const validatorHandler = require("../middlewares/validator.handler");

const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");

const router = express.Router();
const service = new UserService();
const authService = new AuthService();

/* crear */
router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await service.create(data);
      const user = await service.findOne(newUser.id);
      const token = await authService.createTokenJWT(user);
      res.json({
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  }
);
/* obtener todos los usuarios */
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await service.findAll();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});
/* obtener un solo usuario */
router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await service.update(id, data);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);
router.delete(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const userDeleted = await service.delete(id);
      res.json(userDeleted);
    } catch (err) {}
  }
);
module.exports = router;
