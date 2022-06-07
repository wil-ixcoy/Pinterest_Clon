"use strict";
const { IMAGE_TABLE, ImageSchema } = require("../models/image.model");
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(IMAGE_TABLE, ImageSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(IMAGE_TABLE);
  },
};
