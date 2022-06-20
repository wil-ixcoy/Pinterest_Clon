const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.SECRET_CLOUDINARY
});

const ImageService = require("../services/image.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  uploadImageHandler,
  helperImage,
} = require("../middlewares/images.handler");
const {
  createImageSchema,
  getImageSchema,
  updateImageSchema,
} = require("../schemas/image.schema");

const router = express.Router();
const service = new ImageService();

/**
 *@swagger
 * components:
 *  schemas:
 * 
 *    imageUpload:
 *      type: object
 *      properties:
 *        userId:
 *          type: number
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        file:
 *          type: file
 *      required:
 *        - userId
 *        - title
 *        - description
 *        - file
 *      example:
 *        userId: 1
 *        title: "Imagen de un monitor"
 *        description: "Imagen de un monitor"
 *        file: "image.jpg"
 *
 *    ImageUpdate:
 *      type: object
 *      properties:
 *        userId:
 *          type: number
 *        title:
 *          type: string
 *        description:
 *          type: string
 *      example:
 *        title: "Imagen de un monitor"
 *        description: "Imagen de un monitor"
 *
 *
 *    ResponseImages:
 *      example:
 *        id: 1
 *        title: "Imagen de un monitor"
 *        description: "Imagen de un monitor"
 *        url_image: "http://res.cloudinary.com/dk1mbdqmn/image/upload/v1655691194/qypboxdljgs82w2dx7c7.jpg"
 *        userId: 1
 *        user: {
 *         id: 1,
 *         title: "Wiliams Alexander",
 *         description: "Tzoc Ixcoy",
 *         email: "wiliamscode34@gmail.com",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         }
 *
 */

/**
 * @swagger
 * /api/images/upload:
 *  post:
 *    description: Sube una imagen
 *    tags: [Images]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *             $ref: '#/components/schemas/imageUpload'
 *    responses:
 *      200:
 *       description: Imagen subida correctamente
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseUploadImage'
 *      400:
 *       description: Bad request
 *      500:
 *       description: Internal server error
 *
 */
router.post(
  "/upload",
  validatorHandler(createImageSchema, "body"),
  passport.authenticate("jwt", { session: false }),
  uploadImageHandler.single("file"),
  async (req, res, next) => {
    try {
      const imageResize = await helperImage(req.file.path, `resized-${req.file.url_image}`);
      const imageCloudinary = await cloudinary.v2.uploader.upload(imageResize.path);
      console.log(imageResize);
      console.log(imageCloudinary);
      const data = {
        title: req.body.title,
        description: req.body.description,
        url_image: imageCloudinary.secure_url,
        userId: req.body.userId,
      };
      const newImage = await service.create(data);
      await fs.unlink(req.file.path)
      await fs.unlink(imageResize.path)
      res.json(newImage);
    } catch (e) {
      next(e);
    }
  }
);
/* obtener todos los usuarios */
/**
 * @swagger
 * /api/images:
 *  get:
 *    description: Obtiene todas las imagenes
 *    tags: [Images]
 *    responses:
 *      200:
 *       description: Lista todas las imagenes
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseImages'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.get("/", async (req, res, next) => {
  try {
    const allImages = await service.findAll();
    res.json(allImages);
  } catch (err) {
    next(err);
  }
});
/* obtener un solo imagen */
/**
 * @swagger
 * /api/images/{id}/image:
 *  get:
 *    description: Obtiene todas las imagenes
 *    tags: [Images]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Lista todas las imagenes
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseImages'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: La imagen no existe
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.get(
  "/:id/image",
  validatorHandler(getImageSchema, "params"),
  passport.authenticate("jwt", { session: false }),
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
/**
 * @swagger
 * /api/images/{id}/update:
 *  patch:
 *    description: Actualiza un imagen, ni un dato es requerido, se puede cambiar un solo campo o varios, necesita token de autorizacion
 *    tags: [Images]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/ImageUpdate'
 *    responses:
 *      200:
 *       description: Datos actualizados.retorna toda la información del imagen
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseImages'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: La imagen no existe
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.patch(
  "/:id/update",
  validatorHandler(getImageSchema, "params"),
  validatorHandler(updateImageSchema, "body"),
  passport.authenticate("jwt", { session: false }),
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

/**
 * @swagger
 * /api/images/{id}/delete:
 *  delete:
 *    description: elimina una imagen, necesita token de autorizacion
 *    tags: [Images]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: imagen eliminada
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message:
 *            type: string
 *          example: "imagen eliminada"
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: La imagen no existe
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getImageSchema, "params"),

  async (req, res) => {
    try {
      const { id } = req.params;

      const imageDeleted = await service.delete(id);
      res.json(imageDeleted);
    } catch (err) { }
  }
);
module.exports = router;