const { config } = require("../config/config");

module.exports = {
  development: {
    url: config.database_url,
    dialect: "postgres",
  },
  production: {
    url: config.database_url,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
