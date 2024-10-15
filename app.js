const express = require('express');
const { phoneControllers } = require('./controllers');

const app = express();

app.use(express.json());

app.post('/phones', phoneControllers.createPhone);
app.get('/phones', phoneControllers.getAllPhones);
app.get('/phones/:phoneId', phoneControllers.getPhoneById);
app.patch('/phones/:phoneId', phoneControllers.updatePhoneById);
app.delete('/phones/:phoneId', phoneControllers.deletePhoneById);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status ?? 500;
  const message = err.message ?? 'Server Error';

  // console.log('err :>> ', err);
  res.status(status).send(message);
});

module.exports = app;
