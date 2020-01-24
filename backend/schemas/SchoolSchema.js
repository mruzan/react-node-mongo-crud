const baseJoi = require('joi');
const extension = require('joi-date-extensions');

const Joi = baseJoi.extend(extension);

const createValidateSchema = Joi.object().keys({
  name: Joi.string().required(),
  street: Joi.string().min(1).required(),
  suburb: Joi.string().min(1).required(),
  postcode: Joi.string().min(5).max(10).required(),
  state: Joi.string().min(2).required(),
  studentCount: Joi.number().required(),
  status: Joi.string().allow('').allow(null),
});

module.exports = {
  createValidateSchema,
};
