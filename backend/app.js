require('dotenv').config({ path: '/.env' });
const cors = require('cors');
const express = require('express');
const { PORT = 3000, NODE_ENV } = process.env;
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./utils/notfounderror');
const connectDB = require('./config/dbConn');

connectDB();

const app = express();

mongoose.set('strictQuery', false);

app.use(cors(corsOptions));
app.options('*', cors());
app.use(express.json());

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resourece was not found.'));
});

const serverErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};
app.use(serverErrorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
  if (NODE_ENV !== 'test') app.listen(PORT);
});