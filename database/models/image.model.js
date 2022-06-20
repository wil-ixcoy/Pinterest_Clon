const { DataTypes, Model, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./user.model");
const IMAGE_TABLE = "images";

const ImageSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    field: "user_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
};
class Image extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: "user",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      timestamps: false,
      modelName: "Image",
    };
  }
}

module.exports = {
  Image,
  ImageSchema,
  IMAGE_TABLE,
};
