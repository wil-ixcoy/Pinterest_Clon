const joi = require("joi");

const id = joi.number().integer();
const name = joi.string().min(3).max(30);
const description = joi.string();
const userId = joi.number().integer();
const createImageSchema = joi.object({
  userId: userId.required(),
  name: name.required(),
  description: description.required(),
});

const getImageSchema = joi.object({
  id: id.required(),
});

const updateImageSchema = joi.object({
  name: name,
  description: description,
});

module.exports = {
  createImageSchema,
  getImageSchema,
  updateImageSchema,
};
