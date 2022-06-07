const { User, UserSchema } = require("./user.model");
const { Image, ImageSchema } = require("./image.model");
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Image.init(ImageSchema, Image.config(sequelize));

  User.associate(sequelize.models);
  Image.associate(sequelize.models);
}
module.exports = { setupModels };
