const express = require('express');
const { phoneControllers } = require('./controllers');
const { errorHandlers, validate } = require('./middleware');

const app = express();

app.use(express.json());

app.post('/phones', validate.validationOnCreate, phoneControllers.createPhone);
app.get('/phones', phoneControllers.getAllPhones);
app.get('/phones/:phoneId', phoneControllers.getPhoneById);
app.patch(
  '/phones/:phoneId',
  validate.validationOnUpdate,
  phoneControllers.updatePhoneById
);
app.delete('/phones/:phoneId', phoneControllers.deletePhoneById);

app.use(errorHandlers.errorHandler);

module.exports = app;
