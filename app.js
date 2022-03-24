const express = require('express');
const app = express();
const initializeDB = require('./connection');
const apiRouter = require('./routes/apiRoutes');
const customError = require('./controllers/errors');
const cors = require('cors');
// Environment direction initialization
const ENV = process.env.NODE_ENV || 'production';
require('dotenv').config({
  path: `${__dirname}/.env.${ENV}`,
});
initializeDB();

//Parse data
app.use(express.json());

app.use(cors());

//routing
app.use('/api', apiRouter);

//Error Handling
app.use(customError);

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Internal server error' });
});

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Path not found' });
});

module.exports = app;
