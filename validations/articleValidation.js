const Joi = require('joi');

const createArticleSchema = Joi.object({
  title: Joi.string().required().trim().min(3).max(100),
  content: Joi.string().required().min(10),
  author: Joi.string().required().trim().min(2).max(50),
  tags: Joi.array().items(Joi.string().trim()),
});

const updateArticleSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100),
  content: Joi.string().min(10),
  author: Joi.string().trim().min(2).max(50),
  tags: Joi.array().items(Joi.string().trim()),
}).min(1); // at least one field must be provided

module.exports = { createArticleSchema, updateArticleSchema };