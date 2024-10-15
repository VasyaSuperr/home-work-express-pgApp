const express = require('express');
const queryParser = require('query-parser-express');
const { phoneControllers } = require('./controllers');
const { errorHandlers, validate, paginate } = require('./middleware');

const app = express();

app.use(express.json());

app.use(
  queryParser({
    parseBoolean: true,
    parseNumber: true,
  })
);

app.post('/phones', validate.validationOnCreate, phoneControllers.createPhone);
app.get('/phones', paginate.paginatePhones, phoneControllers.getAllPhones);
app.get('/phones/:phoneId', phoneControllers.getPhoneById);
app.patch(
  '/phones/:phoneId',
  validate.validationOnUpdate,
  phoneControllers.updatePhoneById
);
app.delete('/phones/:phoneId', phoneControllers.deletePhoneById);

app.use(errorHandlers.errorHandler);

module.exports = app;
