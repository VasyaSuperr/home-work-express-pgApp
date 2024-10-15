const createHttpError = require('http-errors');
const { Phone } = require('../models');

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;

  try {
    const createdPhone = await Phone.create(body);
    res.status(201).send(createdPhone);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllPhones = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const allPhones = await Phone.getAll(limit, offset);
    res.status(200).send(allPhones);
  } catch (error) {
    next(error);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { phoneId } = req.params;

  try {
    const foundPhone = await Phone.getById(phoneId);

    if (!foundPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(200).send(foundPhone);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePhoneById = async (req, res, next) => {
  const {
    params: { phoneId },
    body,
  } = req;

  try {
    const updatedPhone = await Phone.updateById(body, phoneId);

    if (!updatedPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    res.status(200).send(updatedPhone);
  } catch (error) {
    next(error);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { phoneId } = req.params;

  try {
    const deletedPhone = await Phone.deleteById(phoneId);

    if (!deletedPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports.getPhonesByUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const phonesByUser = await Phone.getPhonesByUser(userId);

    if (!phonesByUser || phonesByUser.length === 0) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send(phonesByUser);
  } catch (error) {
    next(error);
  }
};
