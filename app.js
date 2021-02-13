require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { pageNotFound, handleErrors } = require('./controllers/errors');

const {
  PORT = 3000,
  DATABASE_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;
const app = express();

mongoose.connect(DATABASE_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use('/api/', router);
app.use('*', pageNotFound);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
