const { Sequelize, Model, DataTypes } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "last_name",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
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

class User extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      timestamps: false,
      modelName: "User",
    };
  }
}

module.exports = {
  User,
  UserSchema,
  USER_TABLE,
};
