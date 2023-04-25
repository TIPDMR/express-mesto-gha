const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const cards = require('./routes/cards');
const pageNotFound = require('./routes/pageNotFound');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6447d9c4f7992d0760bae9e8',
  };
  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use('*', pageNotFound);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true, useUnifiedTopology: true,
});

app.listen(PORT);
