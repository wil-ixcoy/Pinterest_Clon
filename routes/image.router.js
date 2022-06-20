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
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        file:
 *          type: file
 *      required:
 *        - userId
 *        - name
 *        - description
 *        - file
 *      example:
 *        userId: 1
 *        name: "Imagen de un monitor"
 *        description: "Imagen de un monitor"
 *        file: "image.jpg"
 *
 *    ImageUpdate:
 *      type: object
 *      properties:
 *        userId:
 *          type: number
 *        name:
 *          type: string
 *        description:
 *          type: string
 *      example:
 *        name: "Imagen de un monitor"
 *        description: "Imagen de un monitor"
 *
 *
 *    ResponseImages:
 *      example:
 *        id: 1
 *        name: "Imagen de un monitor"
 *        description: "Imagen de un monitor"
 *        filename: "1655247459806.jpg"
 *        path: "/home/wiliams-ixcoy/Desktop/node.js/autenticacion/public/images/1655247459806.jpg"
 *        originalname: "fotis-fotopoulos-6sAl6aQ4OWI-unsplash.jpg"
 *        mimetype: "image/jpeg"
 *        userId: 1
 *        user: {
 *         id: 1,
 *         name: "Wiliams Alexander",
 *         description: "Tzoc Ixcoy",
 *         email: "wiliamscode34@gmail.com",
 *         createdAt: "2020-05-05T17:00:00.000Z",
 *         }
 *
 */

/**
 * @swagger
 * /api/images:
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
  "/",
  validatorHandler(createImageSchema, "body"),
  passport.authenticate("jwt", { session: false }),
  uploadImageHandler.single("file"),
  async (req, res, next) => {
    try {
      const imageResize = await helperImage(req.file.path, `resized-${req.file.filename}`);
      const imageCloudinary = await cloudinary.v2.uploader.upload(imageResize.path);
      console.log(imageResize);
      const data = {
        title: req.body.title,
        description: req.body.description,
        url_image: imageCloudinary.url,
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
 * /api/images/{id}:
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
  "/:id",
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
 * api/images/{id}:
 *  patch:
 *    description: Actualiza un usuario, ni un dato es requerido, se puede cambiar un solo campo o varios, necesita token de autorizacion
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
 *       description: Datos actualizados.retorna toda la información del usuario
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
  "/:id",
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
 * /api/images/{id}:
 *  delete:
 *    description: elimina un usuario, necesita token de autorizacion
 *    tags: [Images]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Usuario eliminado
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message:
 *            type: string
 *          example: "User deleted"
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
  "/:id",
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
