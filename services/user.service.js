const boom = require("@hapi/boom");
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
    const user = await models.User.findByPk(id, { include: ["images"] });
    delete user.dataValues.password;
    return user;
  }
  async findAll() {
    const allUser = await models.User.findAll({ include: ["images"] });
    for (const user of allUser) {
      delete user.dataValues.password;
    }
    return allUser;
  }
  async update(id, updateData) {
    const User = await this.findOne(id);
    if (!User) {
      throw boom.notFound("El usuario no existe");
    }
    const userUpdated = await User.update(updateData);
    delete userUpdated.dataValues.password;
    return userUpdated;
  }
  async delete(id) {
    const user = await models.User.findByPk(id);
    user.destroy();
    return {
      message: "Usuario eliminado",
    };
  }

  async findByEmail(email) {
    const user = await models.User.findOne({ where: { email } });
    return user;
  }
}

module.exports = UserService;
