require("dotenv").config();

config = {
  port: process.env.PORT || 3000,
  user_db: process.env.USER_DB,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  database_url: process.env.DATABASE_URL,
};

module.exports = config;
