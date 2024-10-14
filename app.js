const express = require('express');
const { phoneControllers } = require('./controllers');

const app = express();

app.use(express.json());

app.post('/phones', phoneControllers.createPhone);
app.get('/phones', phoneControllers.getAllPhones);
app.get('/phones/:phoneId', phoneControllers.getPhoneById);
app.patch('/phones/:phoneId', phoneControllers.updatePhoneById);
app.delete('/phone/:phoneId', phoneControllers.deletePhoneById);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status ?? 500;
  const message = err.message ?? 'Server Error';

  res.status(status).send(message);
});

module.exports = app;
