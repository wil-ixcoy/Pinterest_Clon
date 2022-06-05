const express = require("express");
const UserService = require("../services/user.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");

const router = express.Router();
const service = new UserService();

/* crear */
router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await service.create(data);
      res.json(newUser);
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
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userDeleted = await service.delete(id);
    res.json(userDeleted);
  } catch (err) {}
});
module.exports = router;
