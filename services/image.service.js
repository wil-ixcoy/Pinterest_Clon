const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class ImageService {
  async create(imageData) {
    const uploadImage = await models.Image.create(imageData);
    return uploadImage;
  }
  async findOne(id) {
    const image = await models.Image.findByPk(id, { include: ["user"] });
    if (!image) {
      throw boom.notFound("La imagen no existe");
    }
    delete image.dataValues.user.dataValues.password;
    return image;
  }
  async findAll() {
    const allImages = await models.Image.findAll({ include: ["user"] });
    for (let i = 0; i < allImages.length; i++) {
      delete allImages[i].dataValues.user.dataValues.password;
    }
    return allImages;
  }
  async update(id, updateData) {
    const Image = await this.findOne(id);
    if (!Image) {
      throw boom.notFound("La imagen no existe");
    }
    const newData = await Image.update(updateData);
    return newData;
  }
  async delete(id) {
    const image = await models.Image.findByPk(id);
    if (!image) {
      throw boom.notFound("La imagen no existe");
    }
    image.destroy();
    return {
      message: "Imagen eliminada",
    };
  }
}

module.exports = ImageService;
