const joi = require("joi");

const id = joi.number().integer();
const title = joi.string().min(3).max(30);
const description = joi.string();
const userId = joi.number().integer();
const createImageSchema = joi.object({
  userId,
  title,
  description,
});

const getImageSchema = joi.object({
  id: id.required(),
});

const updateImageSchema = joi.object({
  title: title,
  description: description,
});

module.exports = {
  createImageSchema,
  getImageSchema,
  updateImageSchema,
};
