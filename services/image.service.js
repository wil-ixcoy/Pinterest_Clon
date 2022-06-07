const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class ImageService {
  async create(imageData) {
    const uploadImage = await models.Image.create(imageData);
    return uploadImage;
  }
  async findOne(id) {
    const image = await models.Image.findByPk(id);
    return image;
  }
  async findAll() {
    const allImages = await models.Image.findAll();
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
    image.destroy();
    return {
      message: "Imagen eliminada",
    };
  }
}

module.exports = ImageService;
