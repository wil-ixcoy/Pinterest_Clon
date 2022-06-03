const joi = require("joi");

const id = joi.number().integer();
const name = joi.string().min(3).max(30);
const lastName = joi.string().min(3).max(30);
const email = joi.string().email();
const password = joi.string().min(6).max(30);

const createUserSchema = {
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
};

const getUserSchema = {
  id: id.required(),
};

const updateUserSchema = {
  id: id.required(),
  name: name,
  lastName: lastName,
  email: email,
};
const deleteUserSchema = {
  id: id.required(),
};

module.exports = {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema,
};
