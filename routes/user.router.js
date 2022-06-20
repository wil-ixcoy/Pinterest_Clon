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
/**
 *@swagger
 * components:
 *  schemas:
 *
 *    UserCreate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          format: password
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *      example:
 *        name: "Wiliams Alexander"
 *        lastName: "Tzoc Ixcoy"
 *        email: "wiliamscode34@gmail.com"
 *        password: "123456789"
 *
 *    UserUpdate:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *          format: email
 *      example:
 *        name: "Wiliams Alexander"
 *        lastName: "Tzoc Ixcoy"
 *        email: "wiliamscode34@gmail.com"
 *
 *    ResponseCreateUser:
 *      example:
 *        id: 1
 *        name: "Wiliams Alexander"
 *        lastName: "Tzoc Ixcoy"
 *        email: "wiliamscode34@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        images: []
 *        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1MjUzNzQyN30.zTXbt6851Mr79mBkje5Bo301msbwQKLdtULOrFc22L0"
 *
 *    ResponseGetAllUser:
 *      example:
 *        id: 1
 *        name: "Wiliams Alexander"
 *        lastName: "Tzoc Ixcoy"
 *        email: "wiliamscode34@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"

 *
 *    ResponseGetOneUser:
 *      example:
 *        id: 1
 *        name: "Wiliams Alexander"
 *        lastName: "Tzoc Ixcoy"
 *        email: "wiliamscode34@gmail.com"
 *        createdAt: "2020-05-05T17:00:00.000Z"
 *        images: [{
 *         createdAt: "2022-06-14T22:57:40.837Z",
 *	       id: 1,
 *	       name: "Imagen de monitor",
 *	       description: "Foto de monitor gamer con fondo rojo y negro",
 *	       filename: "1655247459806.jpg",
 *	       path: "/home/wiliams-ixcoy/Desktop/node.js/autenticacion/public/images/1655247459806.jpg",
 *	       originalname: "fotis-fotopoulos-6sAl6aQ4OWI-unsplash.jpg",
 *	       mimetype: "image/jpeg",
 *	       userId: 1
 *        }]
 */

/**
 * @swagger
 * /api/users/create:
 *  post:
 *    description: Crea un nuevo usuario
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/UserCreate'
 *    responses:
 *      200:
 *       description: El usuario fue creado
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseCreateUser'
 *      400:
 *       description: Bad request
 *      409:
 *       description: email bust be unique
 *      500:
 *       description: Internal server error
 *
 */
router.post(
  "/create",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await service.create(data);
      const user = await service.findOne(newUser.id);
      const Token = await authService.createTokenJWT(user);
      let token = Token.token;
      res.json({
        user,
        token
      });
    } catch (e) {
      next(e);
    }
  }
);

/* obtener todos los usuarios */
/**
 * @swagger
 * /api/users:
 *  get:
 *    description: Obtiene todos los usuarios
 *    tags: [User]
 *    responses:
 *      200:
 *       description: Lista de todos los usuarios
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetAllUser'
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
    const allUsers = await service.findAll();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

/* obtener un solo usuario */
/**
 * @swagger
 * /api/users/{id}/user:
 *  get:
 *    description: Obtiene un solo usuario, necesita token de autorizacion
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    responses:
 *      200:
 *       description: Retorna al usuario que fue buscado
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneUser'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: El usuario no existe
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.get(
  "/:id/user",
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

/**
 * @swagger
 * /api/users/{id}/update:
 *  patch:
 *    description: Actualiza un usuario, ni un dato es requerido, se puede cambiar un solo campo o varios, necesita token de autorizacion
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *    responses:
 *      200:
 *       description: Datos actualizados.retorna toda la información del usuario
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseGetOneUser'
 *      400:
 *       description: Bad request
 *      401:
 *       description: unauthorized
 *      404:
 *       description: El usuario no existe
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.patch(
  "/:id/update",
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

/**
 * @swagger
 * /api/users/{id}/delete:
 *  delete:
 *    description: elimina un usuario, necesita token de autorizacion
 *    tags: [User]
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
 *       description: El usuario no existe
 *      409:
 *       description: conflict
 *      500:
 *       description: Internal server error
 */
router.delete(
  "/:id/delete",
  validatorHandler(getUserSchema, "params"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const userDeleted = await service.delete(id);
      res.json(userDeleted);
    } catch (err) { }
  }
);
module.exports = router;
