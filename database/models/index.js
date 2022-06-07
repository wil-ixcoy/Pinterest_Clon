const { User, UserSchema } = require("./user.model");
const {Images,ImageSchema} = require("./images.model");
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Images.init(ImageSchema, Images.config(sequelize));
}
module.exports = { setupModels };
