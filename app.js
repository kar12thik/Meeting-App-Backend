const createError = require('http-errors');
const express = require('express');
require('./config/mongoose')
let cors = require('cors')
const mainRouter = require('./routers/main');
const roomRouter = require('./routers/rooms');
const customerRouter = require('./routers/customers')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mainRouter);
app.use(roomRouter);
app.use(customerRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('errorrrr');
});

module.exports = app