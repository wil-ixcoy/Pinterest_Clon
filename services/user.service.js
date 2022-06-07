const boom = require("@hapi/boom");
const { throws } = require("assert");
const bcrypt = require("bcrypt");
const { models } = require("../libs/sequelize");

class UserService {
  async create(userData) {
    const passwordHash = await bcrypt.hash(userData.password, 10);

    const newUser = await models.User.create({
      ...userData,
      password: passwordHash,
    });
    return newUser;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id,{ include: ["images"] });
    return user;
  }
  async findAll() {
    const allUser = await models.User.findAll({ include: ["images"] });
    return allUser;
  }
  async update(id, updateData) {
    const User = await this.findOne(id);
    if (!User) {
      throw boom.notFound("El usuario no existe");
    }
    const newData = await User.update(updateData);
    return newData;
  }
  async delete(id) {
    const user = await models.User.findByPk(id);
    user.destroy();
    return {
      message: "Usuario eliminado",
    };
  }
}

module.exports = UserService;
