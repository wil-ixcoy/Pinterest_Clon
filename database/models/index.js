const { User, UserSchema } = require("./user.model");
const {Image,ImageSchema} = require("./image.model");
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Image.init(ImageSchema, Image.config(sequelize));
}
module.exports = { setupModels };
