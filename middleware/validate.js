const createHttpError = require('http-errors');
const {
  CREATE_PHONE_VALIDATION_SCHEMA,
  UPDATE_PHONE_VALIDATION_SCHEMA,
} = require('../utils/validatedSchemas');

module.exports.validationOnCreate = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedPhone = await CREATE_PHONE_VALIDATION_SCHEMA.validate(body);
    req.body = validatedPhone;
    next();
  } catch (error) {
    next(createHttpError(422, error));
  }
};

module.exports.validationOnUpdate = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedPhone = await UPDATE_PHONE_VALIDATION_SCHEMA.validate(body);
    req.body = validatedPhone;
    next();
  } catch (error) {
    next(createHttpError(422, error));
  }
};
