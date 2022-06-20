const express = require("express");
const AuthService = require("../services/auth.service");
const passport = require("passport");

const router = express.Router();
const service = new AuthService();
/**
 *@swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          format: password
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: "wiliamsg200295@gmail.com"
 *        password: "123456789"
 *
 *    ResponseLogin:
 *      type: array
 *      properties:
 *        token:
 *          type: string
 *      example:
 *       user: {
 *        id: 1,
 *        name: "Alexander",
 *        lastName: "Tzoc",
 *        email: "wilicode34@gmail.com",
 *        createdAt: "2020-05-05T17:00:00.000Z",
 *        }
 *       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjUyNjUxNTY5fQ.qd-TIpmLpIiON5SF7_UZCLaXkvmi2xHLm65Pl7Prld4"
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    description: Login de usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *       description: Retorna usuario y token
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseLogin'
 *      400:
 *       description: Bad request
 *      401:
 *       description: El email no está registrado || Contraseña incorrecta
 *      500:
 *       description: Internal server error
 */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = await service.createTokenJWT(req.user);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * @swagger
 * /api/auth/google:
 *  get:
 *    description: Login de usuario con Google
 *    tags: [Auth]

 *    responses:
 *      200:
 *       description: Retorna token de accesso
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseLogin'
 *      400:
 *       description: Bad request
 *      401:
 *       description: El email no está registrado
 *      500:
 *       description: Internal server error
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * @swagger
 * /api/auth/facebook:
 *  get:
 *    description: Login de usuario
 *    tags: [Auth]
 *    responses:
 *      200:
 *       description: Retorna usuario y token
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResponseLogin'
 *      400:
 *       description: Bad request
 *      401:
 *       description: El email no está registrado
 *      500:
 *       description: Internal server error
 */
router.get(
  "/facebook",
  passport.authenticate("facebook"),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);
module.exports = router;
