const { DataTypes, Model, Sequelize } = require("sequelize");

const IMAGE_TABLE = "images";

const ImageSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
};

class Image extends Model {
  static associate(models) {}
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
