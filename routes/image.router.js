const express = require("express");
const ImageService = require("../services/image.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  uploadImageHandler,
  helperImage,
} = require("../middlewares/multer.handler");
const {
  createImageSchema,
  getImageSchema,
  updateImageSchema,
} = require("../schemas/image.schema");

const router = express.Router();
const service = new ImageService();

/* crear */
router.post("/", uploadImageHandler.single("file"), async (req, res, next) => {
  try {
    helperImage(req.file.path, `resized-${req.file.filename}`,100);
    res.json({
      message: "Imagen cargada correctamente",
    });
  } catch (e) {
    next(e);
  }
});
/* obtener todos los usuarios */
router.get("/", async (req, res, next) => {
  try {
    const allImages = await service.findAll();
    res.json(allImages);
  } catch (err) {
    next(err);
  }
});
/* obtener un solo usuario */
router.get(
  "/:id",
  validatorHandler(getImageSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const image = await service.findOne(id);
      res.json(image);
    } catch (err) {
      next(err);
    }
  }
);
router.patch(
  "/:id",
  validatorHandler(getImageSchema, "params"),
  validatorHandler(updateImageSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const image = await service.update(id, data);
      res.json(image);
    } catch (err) {
      next(err);
    }
  }
);
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const imageDeleted = await service.delete(id);
    res.json(imageDeleted);
  } catch (err) {}
});
module.exports = router;
