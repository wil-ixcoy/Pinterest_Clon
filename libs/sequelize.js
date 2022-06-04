const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const { setupModels } = require("../database/models/index.js");

const options = {
  dialect: "postgres",
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.database_url, options);

setupModels(sequelize);

module.exports = sequelize;
