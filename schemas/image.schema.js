const joi = require("joi");

const id = joi.number().integer();
const title = joi.string().min(3).max(30);
const description = joi.string();
const image = joi.string();

const createImageSchema = joi.object({
  title: title.required(),
  description: description.required(),
  image: image.required(),
});

const getImageSchema = joi.object({
  id: id.required(),
});

const updateImageSchema = joi.object({
  title: title,
  description: description,
  image: image,
});

module.exports = {
  createImageSchema,
  getImageSchema ,
  updateImageSchema,
};
