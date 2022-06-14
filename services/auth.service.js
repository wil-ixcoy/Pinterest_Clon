const UserService = require("../services/user.service");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

const serivce = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await serivce.findByEmail(email);
    if (!user) {
      throw boom.unauthorized("El email no está registrado");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw boom.unauthorized("Contraseña incorrecta");
    }
    delete user.dataValues.password;
    return user;
  }
  async createTokenJWT(user) {
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    delete user.dataValues.password;
    return {
      user,
      token,
    };
  }
}

module.exports = AuthService;
